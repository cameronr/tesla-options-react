import { combineReducers } from 'redux'

const optionCodes = (state = {}, action) => {

  switch (action.type) {
    case 'ADD_OPTION_CODE':
      let newState = { ...state }
      newState[action.code] = action.object
      return newState;
    default:
      return state
  }
}

const vehicleData = (state = [], action) => {
  switch (action.type) {
    case 'SET_VEHICLE_DATA':
      let data = action.text.split("options");
      let options = "";

      if (data.length >= 2) {
        // handle case where full URL is posted
        let url = data[1].split("=");
        options = url[1].split("&");
        options = options[0];
      } else {
        // handle just the options string being posted
        options = data[0]

      }
      // var commaregex = new RegExp('\%2C', 'g');
      // myoptions = myoptions.replace(commaregex, ',');
      return options.split(",");
    default:
      return state
  }
}

const appStore = combineReducers({
  optionCodes,
  vehicleData
})

export default appStore
