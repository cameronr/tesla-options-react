import React from 'react'
import { Button, Modal } from 'react-bootstrap';
import './Options.css';

class SimpleModal extends React.Component {
  render() {
    return (
      <Modal show={this.props.show} onHide={this.props.onHide}>
        <Modal.Body>
        {this.props.message}
        </Modal.Body>
        <Modal.Footer>
          <Button onClick={this.props.onHide}>Close</Button>
        </Modal.Footer>
      </Modal>
    );
  }
}

class Options extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      showModal: false
    };
  }

  close = () => {
    this.setState({ showModal: false });
  }

  open = () => {
    this.setState({ showModal: true });
  }

  render() {
    return (
      <div className="Options">
        <div className="Heading">
          <h1>Tesla Model S Options Decoder</h1>
          <p className="lead">
            Enter your link <Button bsStyle="link" onClick={this.open}>(how do I find my link?)</Button>
          </p>
          <SimpleModal show={this.state.showModal} onHide={this.close} message='You can find your link with the option codes by logging in to your "My Tesla" page on the Tesla Motors web site, right clicking on the image of your car, and selecting "Copy Image Address".' />
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

