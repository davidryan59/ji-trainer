import { combineReducersWithOuterState } from '../redux-extensions'
import * as prm from '../_params'
import * as cts from '../constants'

import { getChordData } from '../models/chord'
import { getNextQuestion } from '../models/question'


const playing = (state=false, action, topState) => {
  if (action.type === cts.BUTTON_PRESS && action.id === cts.PLAY_AUDIO) return true
  if (action.type === cts.AUDIO_ENDED) return false
  return state
}

const questionsBP = (state, action, topState) => {
  switch (action.id) {
    case cts.START_TEST:
      return [getNextQuestion(topState, 1)]
    case cts.PLAY_AUDIO:
      return [...state.map(question => 
        question.qNum === action.qNum && !question.hasPlayed ? {...question, hasPlayed: true} : question
      )]
    case cts.SELECT_ANSWER:
      return [getNextQuestion(topState), ...state.map(question =>
        question.qNum === action.qNum ? {...question, userAnswer: action.aNum} : question
      )].splice(0, prm.testMaxQuestionsToDisplay)
    default:
      return state
  }
}

const questions = (state=[], action, topState) => {
  switch (action.type) {
    case cts.BUTTON_PRESS:
      return questionsBP(state, action, topState)
    default:
      return state
  }
}

const chordDataBP = (state, action, topState) => {
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

const chordData = (state=null, action, topState) => {
  switch (action.type) {
    case cts.BUTTON_PRESS:
      return chordDataBP(state, action, topState)
    case cts.SET_PICKLIST:
      return action.regenChords ? null : state
    default:
      return state
  }
}

const updateTargetCents = (state, action, topState) => {
  const qNum = action.qNum
  const aNumInput = action.aNum
  const question = topState.test.questions.find( q => q.qNum === qNum )
  const aNumCorrect = question.correctAnswer
  const newFactor = aNumInput === aNumCorrect ? prm.correctFactor : prm.incorrectFactor
  const newState = Math.min(state * newFactor, prm.maxCentsTarget)
  console.log(newState)
  return newState
}

const targetCentsBP = (state, action, topState) => {
  switch (action.id) {
    case cts.START_TEST:
      return prm.initialCentsTarget
    case cts.SELECT_ANSWER:
      return updateTargetCents(state, action, topState)
    default:
      return state
  }
}

const targetCents = (state=prm.initialCentsTarget, action, topState) => {
  switch (action.type) {
    case cts.BUTTON_PRESS:
      return targetCentsBP(state, action, topState)
    default:
      return state
  }
}

const test = combineReducersWithOuterState({
  targetCents,
  playing,
  chordData,
  questions
})

export default test
