import { combineReducers } from 'redux'

import { getNewQuestion } from '../setup/setupReduxState'
import { testMaxQuestionsToDisplay } from '../_params'
import * as cts from '../constants'


const playing = (state=false, action) => {
  if (action.type === cts.BUTTON_PRESS && action.id === cts.PLAY_AUDIO) return true
  if (action.type === cts.AUDIO_ENDED) return false
  return state
}

const questionsDealWithButtonPress = (state, action) => {
  switch (action.id) {
    case cts.START_TEST:
      return [getNewQuestion(action, 1)]
    case cts.PLAY_AUDIO:
      return [...state.map(question => 
        question.qNum === action.qNum && !question.hasPlayed ? {...question, hasPlayed: true} : question
      )]
    case cts.SELECT_ANSWER:
      return [getNewQuestion(action), ...state.map(question =>
        question.qNum === action.qNum ? {...question, userAnswer: action.aNum} : question
      )].splice(0, testMaxQuestionsToDisplay)
    default:
      return state
  }
}

const questions = (state=[], action) => {
  switch (action.type) {
    case cts.BUTTON_PRESS:
      return questionsDealWithButtonPress(state, action)
    default:
      return state
  }
}

const test = combineReducers({
  playing,
  questions
})

export default test
