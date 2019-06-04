import { combineReducers } from 'redux'

import { BUTTON_PRESS, PLAY_AUDIO, AUDIO_ENDED, START_TEST, SELECT_ANSWER } from '../constants/actionTypes'
import { testMaxQuestionsToDisplay } from '../constants/general'
import { getNewQuestion } from '../setup/setupReduxState'

import { PLAYBACK_SPEED } from '../constants/actionTypes'
import picklist from './picklist'

const playing = (state=false, action) => {
  if (action.type === BUTTON_PRESS && action.id === PLAY_AUDIO) return true
  if (action.type === AUDIO_ENDED) return false
  return state
}

const questionsDealWithButtonPress = (state, action) => {
  switch (action.id) {
    case START_TEST:
      return [getNewQuestion(1)]
    case PLAY_AUDIO:
      return [...state.map(question => 
        (question.qNum === action.qNum && !question.hasPlayed) ? {...question, hasPlayed: true} : question
      )]
    case SELECT_ANSWER:
      return [getNewQuestion(), ...state.map(question =>
        (question.qNum === action.qNum) ? {...question, userAnswer: action.aNum} : question
      )].splice(0, testMaxQuestionsToDisplay)
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

const controlsObj = {}
controlsObj[PLAYBACK_SPEED] = picklist(PLAYBACK_SPEED)
const controls = combineReducers(controlsObj)

const test = combineReducers({
  playing,
  controls,
  questions
})

export default test
