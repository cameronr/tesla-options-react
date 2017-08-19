import React from 'react'
import { Button, Popover, OverlayTrigger } from 'react-bootstrap';
import './Options.css';


const popoverClick = (
  <Popover id="popover-trigger-click">
    You can find your link with the option codes by logging in to your "My Tesla" page on the Tesla Motors web site, right clicking on the image of your car, and selecting "Copy Image Address".
  </Popover>
);

class Options extends React.Component {
  render() {
    return (
      <div className="Options">
        <div className="Heading">
          <h1>Tesla Model S Options Decoder</h1>
          <p className="lead">
            Enter your link
            <OverlayTrigger trigger="click" placement="top" rootClose overlay={popoverClick}>
              <Button bsStyle="link">(how do I find my link?)</Button>
            </OverlayTrigger>
          </p>
          <div className="form-inline">
            <div className="form-group">
              <input type="text" className="form-control" id="pdflink" placeholder="https://my.teslamotors.com/mytesla/pdf/view-design-pdf?" />
              </div>
              <button type="button" className="btn btn-primary" id="submitPdfLink">Check option codes</button>
          </div>
        </div>
      </div>
    );
  }
}

export default Options;

