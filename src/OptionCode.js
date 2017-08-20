import React from 'react'
import PropTypes from 'prop-types'


const OptionCode = ({ code, description }) => (
  <li>{code}: {description}</li>
)

OptionCode.propTypes = {
  code: PropTypes.string.isRequired,
  description: PropTypes.string
}

export default OptionCode
