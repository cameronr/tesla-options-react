import React from 'react'
import PropTypes from 'prop-types'
import './OptionCodeList.css'
import OptionValue from './OptionValue.js'

// const OptionCodeList = ({ optionCodes }) => (
class OptionCodeList extends React.Component {

  render() {

    // organize options by category
    let categories = {}
    for (let code in this.props.optionCodes) {
      let category = "No Info";
      let option = this.props.optionCodes[code];
      if (option['category'])
        category = option['category']

      if (!categories[category])
        categories[category] = {}
      categories[category][code] = option;
    }

    return (
      <div className="OptionCodeList">
        {Object.keys(categories).sort().map((key, index) => {
          return (
            <div key={index}>
              <h5>{key}</h5>
              <dl className="dl-horizontal">
                {Object.keys(categories[key]).map((code, subindex) => {
                  return (
                    <div key={subindex}>
                      <dt>{code}</dt>
                      <OptionValue code={code} option={categories[key][code]} />
                    </div>
                  )
                })}
              </dl>
            </div>
          )})}
      </div>
    )
  }
}

OptionCodeList.propTypes = {
  optionCodes: PropTypes.objectOf(
    PropTypes.shape({
      name: PropTypes.string
    }).isRequired
  ).isRequired
}

export default OptionCodeList
