import React from 'react'
import { Button, FormGroup, FormControl, HelpBlock, ControlLabel, Popover, OverlayTrigger } from 'react-bootstrap';
import './Options.css';
// import OptionCodeList from './OptionCodeList.js';
import MatchingOptionCodes from './containers/MatchingOptionCodes.js'

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

  onClick = () => {
    console.log("clicked");
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
              placeholder="https://my.teslamotors.com/mytesla/pdf/view-design-pdf?..."
            />
            <Button type="submit" bsStyle="primary" bsSize="large" onClick={this.onClick}>
              Submit
            </Button>
          </form>
        </div>
        <MatchingOptionCodes />
      </div>
    );
  }
}

export default Options;

