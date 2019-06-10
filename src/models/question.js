import { randomIntegerBetween } from '../maths'
import * as chd from './chord'
import * as cts from '../constants'
import * as prm from '../_params'


const getSuitableSubset = (chordArray, numberOfAnswers) => {
  const arr = [...chordArray]
  const result = []
  for (let i=0; i<numberOfAnswers; i++) {
    const randIdx = randomIntegerBetween(0, arr.length - 1)
    const randArrArr = arr.splice(randIdx, 1)   // splice here returns an array length 1, with the chord we want inside it.
    const randArr = randArrArr[0]
    result.push(randArr)
  }
  return result
}


let nextQuestionNumber = 1

export const getNextQuestion = (actionData, qNumInput) => {
  // If qNumInput is used, it resets question numbering.
  // Otherwise, leave it blank.
  let qNum = nextQuestionNumber++
  if (qNumInput) {
    qNum = qNumInput
    nextQuestionNumber = qNumInput + 1
  }
  const numberOfAnswers = prm.defaultNumberOfAnswers
  const notesInChord = actionData[cts.NOTES_IN_CHORD] || prm.defaultNotesInChord
  const result = {
    qNum,
    userAnswer: null,
    correctAnswer: randomIntegerBetween(1, numberOfAnswers),
    answers: []
  }
  const chordArray = chd.getChordData({
    notesInChord,
    maxComplexity: actionData[cts.MAX_COMPLEXITY],
    minInterval: actionData[cts.MIN_INTERVAL],
    maxInterval: actionData[cts.MAX_INTERVAL],
    minChordInterval: actionData[cts.MIN_CHORD_INTERVAL],
    maxChordInterval: actionData[cts.MAX_CHORD_INTERVAL],
  }).chords
  console.log(`${chordArray.length} chords fit these criteria`)
  // console.log(chordArray)
  const chordArrayChosenSubset = getSuitableSubset(chordArray, numberOfAnswers)
  for (let aNum=1; aNum<=numberOfAnswers; aNum++) {
    const chord = chordArrayChosenSubset[aNum-1]
    result.answers.push({qNum, aNum, chord})
  }
  
  // Sort in increasing order - chords with lower notes go first
  result.answers.sort( (ans1, ans2) =>
    chd.getChordSizeMeasure(ans1.chord) - chd.getChordSizeMeasure(ans2.chord)
  )
  
  // Calculate stats
  const chordArrayFromAnswers = result.answers.map( answer => answer.chord )
  result.minDistAll = chd.getMinCentsBetweenAnyTwoChords(chordArrayFromAnswers)
  result.minDist = chd.getMinCentsFromFixedChord(chordArrayFromAnswers, result.correctAnswer - 1)
  
  // Return the newly constructed question
  return result
}
