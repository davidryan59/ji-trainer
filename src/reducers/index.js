import { combineReducers } from 'redux'

import windowReducer from './window'


const lastAction = (state = {}, action) => action


const appReducer = combineReducers({
  window: windowReducer,
  lastAction
})

export default appReducer
