import React, { Component } from 'react';
import 'bootstrap/dist/css/bootstrap.css';
import 'bootstrap/dist/css/bootstrap-theme.css';
import './App.css';
import SiteNavBar from './SiteNavBar.js';
import Footer from './Footer.js';


class App extends Component {
  render() {
    return (
      <div className="App">
        <SiteNavBar />
        <p className="App-intro">
          To get started, edit <code>src/App.js</code> and save to reload.
        </p>
        <Footer />
      </div>
    );
  }
}

export default App;
