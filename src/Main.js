import React from 'react'
import { Switch, Route } from 'react-router-dom'
import Options from './Options.js';
import AllOptions from './AllOptions.js';
import About from './About.js';

const Main = () => (
  <div className="container">
    <Switch>
      <Route exact path='/' component={Options}/>
      <Route path='/all-options' component={AllOptions}/>
      <Route path='/about' component={About}/>
    </Switch>
  </div>
);

export default Main;
