import React from 'react';
import { connect } from 'react-redux';
import { Button, FormGroup, FormControl, HelpBlock, Popover, OverlayTrigger } from 'react-bootstrap';
import URL from 'url-parse';
import { setVehicleData } from './actions';
import MatchingOptionCodes from './containers/MatchingOptionCodes';
import './Options.css';

const optionPopover = (
  <Popover id="optionPopover-trigger-click">
    You can find your link with the option codes by logging in to your &quot;My Tesla&quot; page on
    the Tesla Motors web site and then copying the &quot;View Spec&quot; link. You can also enter
    option codes separated by commas.
  </Popover>
);

const vinPopover = (
  <Popover id="vinPopover-trigger-click">
    VIN option code lookup only works for cars that are available on
    <a href="https://www.tesla.com/new" target="_blank" rel="noopener noreferrer">
      Tesla&apos;s new/used inventory site
    </a>
  </Popover>
);

function LinkLabel(text, linkText, popover) {
  return (
    <div className="FormLabel">
      {text}
      <OverlayTrigger trigger="click" placement="top" rootClose overlay={popover}>
        <Button bsStyle="link">{linkText}</Button>
      </OverlayTrigger>
    </div>
  );
}

function FieldGroup({ id, label, help, ...props }) {
  return (
    <FormGroup controlId={id}>
      {label}
      <FormControl {...props} />
      {help && <HelpBlock>{help}</HelpBlock>}
    </FormGroup>
  );
}

function extractOptions(vin, text) {
  // find options string
  let searchString = '<img class="section-hero" src="';
  let startPos = text.indexOf(searchString);
  if (startPos === -1) {
    return null;
  }

  // parse to end of "
  const endPos = text.indexOf('"', startPos + searchString.length);
  if (endPos === -1) {
    return null;
  }

  const url = text.substring(startPos + searchString.length, endPos);
  if (!url) {
    return null;
  }

  searchString = 'options=';
  startPos = url.indexOf(searchString);
  if (startPos === -1) {
    return null;
  }

  const options = url.substring(startPos + searchString.length);
  // console.log(options);
  return options;
}

function handleVinCodes(vin, dispachFn) {
  document.title = `Tesla Options Decoder: ${vin}`;
  dispachFn(setVehicleData('', true));
  // url works for both new and used
  fetch(`https://tesla.whaleface.com/proxy/used/${vin}?redirect=no`)
    .then((response) => {
      // console.log(response);
      if (!response.ok) {
        throw Error(response.statusText);
      }
      return response.text();
    })
    .then((text) => {
      // console.log(text);
      const options = extractOptions(vin, text);
      if (!options) {
        throw Error('couldn\'t find options');
      }
      dispachFn(setVehicleData(options, false));
    })
    .catch((error) => {
      console.log(`Error loading options: ${error}`);
      dispachFn(setVehicleData(null, false, `Error loading: ${error}`));
    });
}


class Options extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      vehicleData: '',
      vin: null,
    };
  }

  componentWillMount() {
    if (window.location.href.indexOf('?') === -1) {
      return;
    }

    const url = new URL(window.location.href, null, true);
    if (Object.prototype.hasOwnProperty.call(url.query, 'vin')) {
      this.setState({ vin: url.query.vin });
      handleVinCodes(url.query.vin, this.props.dispatch);
    } else {
      this.props.dispatch(setVehicleData(window.location.href));
    }
  }

  componentWillUpdate(nextProps, nextState) {
    document.title = `Tesla Options Decoder: ${nextState.vin}`;
  }

  onClick = () => {
    if (this.state.vehicleData) {
      this.props.dispatch(setVehicleData(this.state.vehicleData));
    } else if (this.state.vin) {
      handleVinCodes(this.state.vin, this.props.dispatch);
    }
  }

  handleKeyPress = (e) => {
    // prevent submission on form eneter
    if (e.key === 'Enter') {
      e.preventDefault();
      this.onClick();
    }
  }

  handleVehicleDataChange = (event) => {
    this.setState({ vehicleData: event.target.value });
  }

  handleVINChange = (event) => {
    this.setState({ vin: event.target.value });
  }

  render() {
    return (
      <div className="Options">
        <div className="Heading">
          <h1>Tesla Model S / X Options Decoder</h1>
          <form>
            <FieldGroup
              id="optionsLink"
              type="text"
              label={LinkLabel('Enter your link', '(how do I find my link?)', optionPopover)}
              onChange={this.handleVehicleDataChange}
              onKeyPress={this.handleKeyPress}
              placeholder="https://my.teslamotors.com/mytesla/pdf/view-design-pdf?..."
            />
            <FieldGroup
              id="vin"
              type="text"
              value={this.state.vin ? this.state.vin : ''}
              label={LinkLabel('or a VIN number', '(details)', vinPopover)}
              onChange={this.handleVINChange}
              onKeyPress={this.handleKeyPress}
              placeholder="5YJSA1E40FF000000"
            />
            <Button bsStyle="primary" bsSize="large" onClick={this.onClick}>
              Decode Options
            </Button>
          </form>
        </div>
        <MatchingOptionCodes />
      </div>
    );
  }
}


export default connect()(Options);

