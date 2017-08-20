export const addOptionCode = (code, description) => {
  return {
    type: 'ADD_OPTION_CODE',
    code: code,
    description: description
  }
}

export const loadOptionCodes = () => {
  return {
    type:'LOAD_OPTION_CODES'
  }
}



