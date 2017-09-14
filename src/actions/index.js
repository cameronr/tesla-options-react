export const addOptionCode = (code, object) => ({
  type: 'ADD_OPTION_CODE',
  code,
  object,
});

export const setVehicleData = (text, loading = false, errorMessage = null) => ({
  type: 'SET_VEHICLE_DATA',
  text,
  loading,
  errorMessage,
});

// export const loadOptionCodes = () => {
//   return {
//     type:'LOAD_OPTION_CODES'
//   }
// }
