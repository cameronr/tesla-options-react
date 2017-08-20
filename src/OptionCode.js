import React from 'react'
import PropTypes from 'prop-types'


const OptionCode = ({ code, object }) => (
  <dt>{code}</dt>
)

OptionCode.propTypes = {
  code: PropTypes.string.isRequired,
  object: PropTypes.object.isRequired
}

export default OptionCode
