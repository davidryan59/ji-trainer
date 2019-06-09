import { combineReducers } from 'redux'

import { getChordData } from '../chords'
import { getNewQuestion } from '../setup/setupReduxState'
import { testMaxQuestionsToDisplay } from '../_params'
import * as cts from '../constants'


const playing = (state=false, action) => {
  if (action.type === cts.BUTTON_PRESS && action.id === cts.PLAY_AUDIO) return true
  if (action.type === cts.AUDIO_ENDED) return false
  return state
}

const questionsBP = (state, action) => {
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
      return questionsBP(state, action)
    default:
      return state
  }
}

const chordDataBP = (state, action) => {
  switch (action.id) {
    case cts.VALIDATE_TEST:
      return getChordData({
        notesInChord: action[cts.NOTES_IN_CHORD],
        maxComplexity: action[cts.MAX_COMPLEXITY],
        minInterval: action[cts.MIN_INTERVAL],
        maxInterval: action[cts.MAX_INTERVAL],
        minChordInterval: action[cts.MIN_CHORD_INTERVAL],
        maxChordInterval: action[cts.MAX_CHORD_INTERVAL],
      })
    case cts.FINISH_TEST:
      return null
    default:
      return state
  }
}

const chordData = (state=null, action) => {
  switch (action.type) {
    case cts.BUTTON_PRESS:
      return chordDataBP(state, action)
    case cts.SET_PICKLIST:
      return action.regenChords ? null : state
    default:
      return state
  }
}    

const test = combineReducers({
  playing,
  chordData,
  questions
})

export default test
