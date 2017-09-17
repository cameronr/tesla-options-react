import React from 'react';
import { connect } from 'react-redux';
import AllOptionCodes from './containers/AllOptionCodes';

const AllOptions = () => (
  <div>
    <AllOptionCodes />
  </div>
);

export default connect()(AllOptions);

