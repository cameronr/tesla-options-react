import React from 'react';
import fetch from 'isomorphic-fetch'
import 'bootstrap/dist/css/bootstrap.css';
import 'bootstrap/dist/css/bootstrap-theme.css';
import './App.css';
import SiteNavBar from './SiteNavBar.js';
import Main from './Main.js';
import Footer from './Footer.js';
import PropTypes from 'prop-types'
import { addOptionCode, setVehicleData } from './actions'


function fetchCodes(store) {
  return fetch('pricebook-3.5_MS_US.json')
    .then(response => response.json())
    .then(json => {
      let options = json['tesla']['configSetPrices']['options'];
      for (let key in options) {
        store.dispatch(addOptionCode(key, options[key]))
      }
    })
}

class App extends React.Component {
  componentDidMount() {
    fetchCodes(this.context.store);

    if (window.location.href.indexOf('?') !== -1)
      this.context.store.dispatch(setVehicleData(window.location.href));
  }

  render() {
    return (
      <div className="App">
        <SiteNavBar />
        <Main />
        <Footer />
      </div>
    );
  }
}

App.contextTypes = {
  store: PropTypes.object.isRequired
};

export default App;
