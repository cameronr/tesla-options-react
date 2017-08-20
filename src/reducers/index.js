import { combineReducers } from 'redux'

const optionCodes = (state = [], action) => {

  switch (action.type) {
    case 'ADD_OPTION_CODE':
      return [
        ...state,
      {
        code: action.code,
        description: action.description
      }
    ]
    default:
      return state
  }
}

const appStore = combineReducers({
  optionCodes
})

export default appStore
