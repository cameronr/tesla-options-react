import { connect } from 'react-redux'
import OptionCodeList from '../OptionCodeList'

const getMatchingOptionCodes = (optionCodes) => {
  return optionCodes;
}

const mapStateToProps = state => {
  return {
    optionCodes: getMatchingOptionCodes(state.optionCodes)
  }
}

const mapDispatchToProps = dispatch => {
  return {

  }
}

const MatchingOptionCodes  = connect(
  mapStateToProps,
  mapDispatchToProps
)(OptionCodeList)

export default MatchingOptionCodes
