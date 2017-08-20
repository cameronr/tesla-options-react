import React from 'react';
import 'bootstrap/dist/css/bootstrap.css';
import 'bootstrap/dist/css/bootstrap-theme.css';
import './App.css';
import SiteNavBar from './SiteNavBar.js';
import Main from './Main.js';
import Footer from './Footer.js';
import PropTypes from 'prop-types'

import fetch from 'isomorphic-fetch'

import { addOptionCode } from './actions'


function fetchCodes(store) {
  return fetch('pricebook-3.5_MS_US.json')
    .then(response => response.json())
    .then(json => {
      console.log(json);
      Object.entries(json['tesla']['configSetPrices']['options']).map(([code, obj]) => {
        console.log(code + ": " + obj.name);

        store.dispatch(addOptionCode(code, obj.name));

        return null;
      })
    })
}



class App extends React.Component {

  constructor(props) {
    super(props);
  }

  componentDidMount() {
    // console.log(this);
    console.log(this.context.store);
    // console.log('exampleComponent mounted');
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
  store: React.PropTypes.object.isRequired
};

export default App;
