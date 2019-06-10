import { combineReducersWithOuterState } from '../redux-extensions'
import * as cts from '../constants'

import setup from './setup'
import test from './test'
import windowReducer from './window'


const mode = (state = cts.SETUP_TEST, action, topState) => {
  if (action.type === cts.BUTTON_PRESS) {
    if (action.id === cts.VALIDATE_TEST) return cts.TEST_VALID
    if (action.id === cts.START_TEST) return cts.TAKE_TEST
    if (action.id === cts.FINISH_TEST) return cts.MARK_TEST
    if (action.id === cts.FINISH_REVIEW) return cts.SETUP_TEST
  }
  return state
}

const lastAction = (state = {}, action, topState) => action

const appReducer = combineReducersWithOuterState({
  mode,
  setup,
  test,
  window: windowReducer,
  lastAction
})

export default appReducer
