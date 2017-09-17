import { connect } from 'react-redux';
import OptionCodeList from '../OptionCodeList';

const mapStateToProps = state => ({
  optionCodes: state.optionCodes,
  optionCategories: state.optionCategories,
  loading: state.loading,
  errorMessage: state.errorMessage,
});


const AllOptionCodes = connect(
  mapStateToProps,
)(OptionCodeList);

export default AllOptionCodes;
