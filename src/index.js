import React from 'react';
import { render } from 'react-dom';
import { Provider } from 'react-redux';
import { createStore } from 'redux';
import { BrowserRouter as Router } from 'react-router-dom';
import { unregister } from './registerServiceWorker';
import appStore from './reducers';
import App from './App';
import './index.css';

const store = createStore(appStore);

render(
  <Provider store={store}>
    <Router>
      <App />
    </Router>
  </Provider>,
  document.getElementById('root'),
);
// registerServiceWorker();
unregister();
