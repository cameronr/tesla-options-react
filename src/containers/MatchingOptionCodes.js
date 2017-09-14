import { connect } from 'react-redux';
import OptionCodeList from '../OptionCodeList';

const getMatchingOptionCodes = (optionCodes, vehicleData) => {
  // split vehicle data, iterate over vehicle data, finding matching option Codes
  const matchingOptionCodes = {};
  Object.keys(vehicleData).forEach((key) => {
    const code = vehicleData[key];
    // if it's in optionCodes, bring it over
    // if not, create a new, empty object
    if (code in optionCodes) {
      matchingOptionCodes[code] = optionCodes[code];
    } else {
      matchingOptionCodes[code] = { };
    }
  });


  return matchingOptionCodes;
};

const mapStateToProps = state => ({
  optionCodes: getMatchingOptionCodes(state.optionCodes, state.vehicleData),
  loading: state.loading,
  errorMessage: state.errorMessage,
});


const MatchingOptionCodes = connect(
  mapStateToProps,
)(OptionCodeList);

export default MatchingOptionCodes;
