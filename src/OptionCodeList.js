import React from 'react'
import PropTypes from 'prop-types'
import OptionCode from './OptionCode.js'

const OptionCodeList = ({ optionCodes }) => (
  <ul>
    {optionCodes.map(optionCode => (
      <OptionCode key={optionCode.code} {...optionCode} />
    ))}
  </ul>
)

OptionCodeList.propTypes = {
  optionCodes: PropTypes.arrayOf(
    PropTypes.shape({
      code: PropTypes.string.isRequired,
      description: PropTypes.string
    }).isRequired
  ).isRequired
}

export default OptionCodeList
