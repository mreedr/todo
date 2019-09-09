/* Root Reducer */

import { combineReducers } from 'redux'

export default combineReducers({
  tokenReducer: (state = {}, action) => {
    switch (action.type) {
      case 'SET_TOKEN':
        return {
          ...state,
          jwtToken: action.payload.token
        }
      default:
        return state
    }
  }
})
