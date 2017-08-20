export const addOptionCode = (code, object) => {
  return {
    type: 'ADD_OPTION_CODE',
    code: code,
    object: object
  }
}

export const setVehicleData = (text) => {
  return {
    type: 'SET_VEHICLE_DATA',
    text
  }
}

// export const loadOptionCodes = () => {
//   return {
//     type:'LOAD_OPTION_CODES'
//   }
// }



