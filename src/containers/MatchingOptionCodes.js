import { connect } from 'react-redux'
import OptionCodeList from '../OptionCodeList'

const getMatchingOptionCodes = (optionCodes, vehicleData) => {

  // split vehicle data, iterate over vehicle data, finding matching option Codes
  let matchingOptionCodes = {};
  Object.keys(vehicleData).forEach(key => {
    let code = vehicleData[key];
    // if it's in optionCodes, bring it over
    // if not, create a new, empty object
    if (code in optionCodes) {
      matchingOptionCodes[code] = optionCodes[code]
    } else {
      matchingOptionCodes[code] = { }
    }
  });


  return matchingOptionCodes;
}

const mapStateToProps = state => {
  return {
    optionCodes: getMatchingOptionCodes(state.optionCodes, state.vehicleData)
  }
}

const MatchingOptionCodes  = connect(
  mapStateToProps
)(OptionCodeList)

export default MatchingOptionCodes
