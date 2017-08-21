import { combineReducers } from 'redux'
import URL from 'url-parse'


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
      let options = "";
      if (action.text.indexOf('?') !== -1) {
        let url = new URL(action.text, null, true);
        if (url.query.hasOwnProperty('options')) {
          // ?options=AF02,...
          options = url.query['options'];
        } else if (url.query) {
          //?AF02,...
          options = Object.keys(url.query)[0];
        }
      } else {
        //AF02...
        options = action.text;
      }
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
