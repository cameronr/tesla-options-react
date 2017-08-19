import React from 'react';
import 'bootstrap/dist/css/bootstrap.css';
import 'bootstrap/dist/css/bootstrap-theme.css';
import './App.css';
import SiteNavBar from './SiteNavBar.js';
import Main from './Main.js';
import Footer from './Footer.js';


const App = () => (
  <div className="App">
    <SiteNavBar />
    <Main />
    <Footer />
  </div>
);

export default App;
