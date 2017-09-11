import React from 'react';
import PropTypes from 'prop-types';
import Spinner from 'react-spinner';
import OptionValue from './OptionValue';

import 'react-spinner/react-spinner.css';
import './OptionCodeList.css';

// const OptionCodeList = ({ optionCodes }) => (
class OptionCodeList extends React.Component {
  render() {
    // organize options by category
    const categories = {};
    for (const code in this.props.optionCodes) {
      let category = 'No Info';
      const option = this.props.optionCodes[code];
      if (option.category) {
        category = option.category;
      }

      if (!categories[category]) {
        categories[category] = {};
      }
      categories[category][code] = option;
    }

    const options = Object.keys(categories).sort().map(key => (
      <div key={key}>
        <h5>{key}</h5>
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
  loading: PropTypes.bool.isRequired,
};

export default OptionCodeList;
