import { combineReducers } from 'redux'

import test from './test'
import windowReducer from './window'

const lastAction = (state = {}, action) => action

const appReducer = combineReducers({
  test,
  window: windowReducer,
  lastAction
})

export default appReducer
