import React from 'react'
import { connect } from 'react-redux'
import { Button, FormGroup, FormControl, HelpBlock, ControlLabel, Popover, OverlayTrigger } from 'react-bootstrap';
import './Options.css';
import MatchingOptionCodes from './containers/MatchingOptionCodes.js'
import { setVehicleData } from './actions'


const popoverClick = (
  <Popover id="popover-trigger-click">
    You can find your link with the option codes by logging in to your "My Tesla" page on the Tesla Motors web site, right clicking on the image of your car, and selecting "Copy Image Address". You can also enter option codes separated by commas.
  </Popover>
);

function LinkLabel() {
  return (
    <div className="lead">
      Enter your link
      <OverlayTrigger trigger="click" placement="top" rootClose overlay={popoverClick}>
        <Button bsStyle="link">(how do I find my link?)</Button>
      </OverlayTrigger>
    </div>
  );
}

function FieldGroup({ id, label, help, ...props }) {
  return (
    <FormGroup controlId={id}>
      <ControlLabel>{label}</ControlLabel>
      <FormControl {...props} />
      {help && <HelpBlock>{help}</HelpBlock>}
    </FormGroup>
  );
}

class Options extends React.Component {

   constructor(props) {
    super(props);
    this.state = {
      vehicleData: ''
    };
  }

  handleChange = (event) => {
    this.setState({vehicleData: event.target.value});
  }

  onClick = () => {
    this.props.dispatch(setVehicleData(this.state.vehicleData));
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
              label={LinkLabel()}
              onChange={this.handleChange}
              onKeyPress={this._handleKeyPress}
              placeholder="https://my.teslamotors.com/mytesla/pdf/view-design-pdf?..."
            />
            <Button bsStyle="primary" bsSize="large" onClick={this.onClick}>
              Submit
            </Button>
          </form>
        </div>
        <MatchingOptionCodes />
      </div>
    );
  }
}



export default connect()(Options)

