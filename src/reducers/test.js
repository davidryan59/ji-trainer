import { combineReducers } from 'redux'

import { BUTTON_PRESS, START_TEST, SELECT_ANSWER } from '../constants/actionTypes'
import { getNewQuestion } from '../setup/setupReduxState'

const setup = (state={}, action) => {
  return state
}

const questionsDealWithButtonPress = (state, action) => {
  switch (action.id) {
    case START_TEST:
      return [getNewQuestion(1)]
    case SELECT_ANSWER:
      return [getNewQuestion(state.length + 1), ...state.map(question =>
        (question.qNum === action.qNum) ? {...question, userAnswer: action.aNum} : question
      )]
    default:
      return state
  }
}

const questions = (state=[], action) => {
  switch (action.type) {
    case BUTTON_PRESS:
      return questionsDealWithButtonPress(state, action)
    default:
      return state
  }
}

const test = combineReducers({
  setup,
  questions
})


export default test
