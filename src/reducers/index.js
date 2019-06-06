import { combineReducers } from 'redux'

import setup from './setup'
import test from './test'
import windowReducer from './window'

import {
  SETUP_TEST, TAKE_TEST, MARK_TEST,
  START_TEST, FINISH_TEST, FINISH_REVIEW,
  BUTTON_PRESS
} from '../constants'


const mode = (state = SETUP_TEST, action) => {
  if (action.type === BUTTON_PRESS) {
    if (action.id === START_TEST) return TAKE_TEST
    if (action.id === FINISH_TEST) return MARK_TEST
    if (action.id === FINISH_REVIEW) return SETUP_TEST
  }
  return state
}

const lastAction = (state = {}, action) => action

const appReducer = combineReducers({
  mode,
  setup,
  test,
  window: windowReducer,
  lastAction
})

export default appReducer
