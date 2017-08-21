import React from 'react'
import PropTypes from 'prop-types'
import OptionCode from './OptionCode.js'
import './OptionCodeList.css'

// from https://stackoverflow.com/questions/35770253/returning-paired-elements-in-react-jsx
const OptionCodeList = ({ optionCodes }) => (
  <dl className="OptionCodeList dl-horizontal">
    {Object.keys(optionCodes).reduce((acc, key, idx) => {
      return acc.concat([
          <dt key={`def-${idx}`}>{key}</dt>,
          <dd key={`term-${idx}`}>{optionCodes[key]['name']}</dd>
      ]);
    }, [])}
  </dl>
)

OptionCodeList.propTypes = {
  optionCodes: PropTypes.objectOf(
    PropTypes.shape({
      name: PropTypes.string
    }).isRequired
  ).isRequired
}

export default OptionCodeList
