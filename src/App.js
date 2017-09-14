import React from 'react';
import PropTypes from 'prop-types';
import fetch from 'isomorphic-fetch';
import entries from 'object.entries';
import 'bootstrap/dist/css/bootstrap.css';
import 'bootstrap/dist/css/bootstrap-theme.css';
import './App.css';
import SiteNavBar from './SiteNavBar';
import Main from './Main';
import Footer from './Footer';
import { addOptionCode, addOptionCategory, setVehicleData } from './actions';

if (!Object.entries) {
  entries.shim();
}

function fetchCodesForModel(store, model) {
  fetch(`pricebooks/pricebook_${model}_US.json`)
    .then(response => response.json())
    .then((json) => {
      Object.entries(json.options).map(([code, option]) => (
        store.dispatch(addOptionCode(code, option))
      ));
      Object.entries(json.categories).map(([category, object]) => (
        store.dispatch(addOptionCategory(category, object))
      ));
    });
}

function fetchCodes(store) {
  fetchCodesForModel(store, 'x');
  fetchCodesForModel(store, 's');
}

class App extends React.Component {
  componentDidMount() {
    fetchCodes(this.context.store);

    if (window.location.href.indexOf('?') !== -1) {
      this.context.store.dispatch(setVehicleData(window.location.href));
    }
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
  store: PropTypes.object.isRequired,
};

export default App;
