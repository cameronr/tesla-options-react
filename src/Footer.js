import React, { Component } from 'react';
import './Footer.css';

class Footer extends Component {
  render() {
    var link = <a href="https://github.com/cameronr/tesla-options-decoder">Source available on GitHub</a>;
    return (
      <div className="Footer">
        <div className="container">
          <p className="text-muted text-center">
            Cameron Ring, 2017 {link}
          </p>
        </div>
      </div>
    );
  }
}

export default Footer;

