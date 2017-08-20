import React from 'react';
import fetch from 'isomorphic-fetch'
import 'bootstrap/dist/css/bootstrap.css';
import 'bootstrap/dist/css/bootstrap-theme.css';
import './App.css';
import SiteNavBar from './SiteNavBar.js';
import Main from './Main.js';
import Footer from './Footer.js';
import PropTypes from 'prop-types'
import { addOptionCode } from './actions'


function fetchCodes(store) {
  return fetch('pricebook-3.5_MS_US.json')
    .then(response => response.json())
    .then(json => {
      Object.entries(json['tesla']['configSetPrices']['options']).map(([code, obj]) => {
        // console.log(code + ": " + obj.name);
        // console.log(obj);
        // add code to the object
        store.dispatch(addOptionCode(code, obj));
        return null;
      })
    })
}



class App extends React.Component {
  componentDidMount() {
    fetchCodes(this.context.store);
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
