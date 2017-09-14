import React from 'react';
import PropTypes from 'prop-types';
import { Alert } from 'react-bootstrap';
import Spinner from 'react-spinner';
import 'react-spinner/react-spinner.css';

import OptionValue from './OptionValue';

import './OptionCodeList.css';

// const OptionCodeList = ({ optionCodes }) => (
class OptionCodeList extends React.Component {
  render() {
    // organize options by category
    const categories = Object.entries(this.props.optionCodes).reduce((c, [code, option]) => {
      let category = 'No Info';
      if (option.category) {
        category = option.category;
      }
      if (!c[category]) {
        c[category] = {};
      }
      c[category][code] = option;
      return c;
    }, {});

    // console.log(categories);

    const options = Object.keys(categories).sort().map(key => (
      <div key={key}>
        <h5>{this.props.optionCategories[key] ? `${this.props.optionCategories[key].name} (${key})` : key}</h5>
        <dl className="dl-horizontal">
          {Object.keys(categories[key]).map(code => (
            <div key={code}>
              <dt>{code}</dt>
              <OptionValue code={code} option={categories[key][code]} />
            </div>
          ))}
        </dl>
      </div>
    ));

    return (
      <div className="OptionCodeList">
        {this.props.errorMessage ? <Alert bsStyle="danger">{this.props.errorMessage}</Alert> : null}
        {this.props.loading ? <Spinner /> : options}
      </div>
    );
  }
}

OptionCodeList.propTypes = {
  optionCodes: PropTypes.objectOf(
    PropTypes.shape({
      name: PropTypes.string,
    }).isRequired,
  ).isRequired,
  optionCategories: PropTypes.objectOf(
    PropTypes.shape({
      name: PropTypes.string,
    }).isRequired,
  ).isRequired,
  loading: PropTypes.bool.isRequired,
  errorMessage: PropTypes.string,
};

OptionCodeList.defaultProps = {
  errorMessage: null,
};

export default OptionCodeList;
