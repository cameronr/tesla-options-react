import React from 'react'
import { connect } from 'react-redux'
import { Button, FormGroup, FormControl, HelpBlock, Popover, OverlayTrigger } from 'react-bootstrap';
import './Options.css';
import MatchingOptionCodes from './containers/MatchingOptionCodes.js'
import { setVehicleData } from './actions'


const optionPopover = (
  <Popover id="optionPopover-trigger-click">
    You can find your link with the option codes by logging in to your "My Tesla" page on the Tesla Motors web site and then copying the "View Spec" link. You can also enter option codes separated by commas.
  </Popover>
);

const vinPopover = (
  <Popover id="vinPopover-trigger-click">
    VIN option code lookup only works for cars that are available on <a href="https://www.tesla.com/new" target="_blank" rel="noopener noreferrer">Tesla's new/used inventory site</a>
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
  if (startPos === -1)
    return null;

  // parse to end of "
  let endPos = text.indexOf('"', startPos + searchString.length);
  if (endPos === -1)
    return null;

  let url = text.substring(startPos + searchString.length, endPos);
  if (!url)
    return null;

  searchString = "options="
  startPos = url.indexOf(searchString);
  if (startPos === -1)
    return null;

  let options = url.substring(startPos + searchString.length);
  console.log(options);
  return options;
}

function handleVinCodes(vin, dispachFn) {
  // check used first
  fetch('https://tesla.whaleface.com/proxy/used/' + vin + '?redirect=no')
    .then(response => response.text())
    .then(text => {
      let options = extractOptions(vin, text);
      if (options) {
        // console.log(options);
        dispachFn(setVehicleData(options));
        return null;
      }
      // check new
      return fetch('https://tesla.whaleface.com/proxy/new/' + vin + '?redirect=no')
              .then(response => response.text())
              .then(text => {
                return extractOptions(vin, text);
              })
    })
}


class Options extends React.Component {

   constructor(props) {
    super(props);
    this.state = {
      vehicleData: '',
      vin: null
    };
  }

  handleVehicleDataChange = (event) => {
    this.setState({'vehicleData': event.target.value});
  }

  handleVINChange = (event) => {
    this.setState({'vin': event.target.value});
  }

  onClick = () => {
    if (this.state.vehicleData) {
      this.props.dispatch(setVehicleData(this.state.vehicleData));
    } else if (this.state.vin) {
      handleVinCodes(this.state.vin, this.props.dispatch);
    }
  }

  _handleKeyPress = (e) => {
    // prevent submission on form eneter
    if (e.key === 'Enter') {
      e.preventDefault();
      this.onClick();
    }
  }

  render() {
    return (
      <div className="Options">
        <div className="Heading">
          <h1>Tesla Model S Options Decoder</h1>
          <form>
            <FieldGroup
              id="optionsLink"
              type="text"
              label={LinkLabel("Enter your link", "(how do I find my link?)", optionPopover)}
              onChange={this.handleVehicleDataChange}
              onKeyPress={this._handleKeyPress}
              placeholder="https://my.teslamotors.com/mytesla/pdf/view-design-pdf?..."
            />
            <FieldGroup
              id="vin"
              type="text"
              label={LinkLabel("or a VIN number", "(details)", vinPopover)}
              onChange={this.handleVINChange}
              onKeyPress={this._handleKeyPress}
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



export default connect()(Options)

