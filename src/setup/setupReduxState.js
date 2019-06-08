import { randomIntegerBetween, gcd } from '../maths'
import { controlSetupArray } from '../controls'
import {
  getChords, getChordSizeMeasure,
  getMinCentsBetweenAnyTwoChords, getMinCentsFromFixedChord
} from '../chords'

import * as cts from '../constants'
import * as prm from '../_params'


export const getInitialWindowState = () => ({
  width: window.innerWidth,
  height: window.innerHeight  
})


// SPECIAL CASES FOR 2, 4 NOTES
// GOING TO REDO THIS LATER WITH A GENERAL METHOD...

// 2 notes
const sternBrocot = (array, levels=0) => {
  // Array of form [[n1, d1], [n2, d2]]
  // Suggested values [[1, 1], [2, 1]]
  if (levels < 1) return array
  const newArray = []
  for (let i=1; i<array.length; i++) {
    const prevElt = array[i-1]
    const thisElt = array[i]
    newArray.push(prevElt)
    newArray.push([prevElt[0] + thisElt[0], prevElt[1] + thisElt[1]])
  }
  newArray.push(array[array.length - 1])
  return sternBrocot(newArray, levels - 1)
}

const sbArrayFor2Notes = sternBrocot([[1,1],[2,1]], 4)

// END OF TEMPORARY SPECIAL CASES


let nextQuestionNumber = 1

export const getNewQuestion = (actionData, qNumInput) => {
  // qNumInput is optional.
  // If used, it resets question numbering.
  let qNum
  if (qNumInput) {
    qNum = qNumInput
    nextQuestionNumber = qNumInput + 1
  } else {
    qNum = nextQuestionNumber++
  }
  // const numberOfAnswers = randomIntegerBetween(2, 6)
  const numberOfAnswers = prm.defaultNumberOfAnswers
  const notesInChord = actionData[cts.NOTES_IN_CHORD] || prm.defaultNumberOfNotes
  const result = {
    qNum,
    userAnswer: null,
    correctAnswer: randomIntegerBetween(1, numberOfAnswers),
    answers: []
  }
  let chordSet, randomSternBrocotPosition, answerFraction
  if (notesInChord === 2) {
    // Use Stern-Brocot tree
    randomSternBrocotPosition = randomIntegerBetween(0, sbArrayFor2Notes.length - numberOfAnswers)
  }
  if (notesInChord === 4) {
    // Generate a new chord set using specified parameters
    // Note - need to refactor so that this route is always used.
    // Currently, getChords only supports 4 note chords...
    chordSet = getChords({
      maxComplexity: actionData[cts.MAX_COMPLEXITY],
      minInterval: actionData[cts.MIN_INTERVAL],
      maxInterval: actionData[cts.MAX_INTERVAL],
      minChordInterval: actionData[cts.MIN_CHORD_INTERVAL],
      maxChordInterval: actionData[cts.MAX_CHORD_INTERVAL],
    }).chords
    console.log(`${chordSet.length} chords fit these criteria`)
    console.log(chordSet)
  }
  for (let aNum=1; aNum<=numberOfAnswers; aNum++) {
    if (notesInChord === 2) {
      // Use Stern-Brocot tree
      answerFraction = sbArrayFor2Notes[randomSternBrocotPosition + aNum - 1]
      console.log(`Stern Brocot used (TEMPORARY)`)
    }
    result.answers.push(getNewAnswer({qNum, aNum, notesInChord, answerFraction, chordSet}))
  }
  
  // Sort in increasing order - chords with lower notes go first
  result.answers.sort( (ans1, ans2) =>
    getChordSizeMeasure(ans1.chord) - getChordSizeMeasure(ans2.chord)
  )
  
  // Calculate stats
  const chordArray = result.answers.map( answer => answer.chord )
  result.minDistAll = getMinCentsBetweenAnyTwoChords(chordArray)
  result.minDist = getMinCentsFromFixedChord(chordArray, result.correctAnswer - 1)
  
  // Return the newly constructed question
  return result
}

const getNewAnswer = ({ qNum, aNum, notesInChord, answerFraction, chordSet }) => {
  const chord = answerFraction
              ? [answerFraction[1], answerFraction[0]]
              : chordSet
              ? getRandomChordFromSet(chordSet)
              : getRandomChord(notesInChord)
  const result = {
    qNum,
    aNum,
    chord
  }
  return result
}

const getRandomChordFromSet = chordSet => {
  console.log(`Random chord set used (TEMPORARY)`)
  const idx = randomIntegerBetween(0, chordSet.length - 1)
  const randChord = chordSet[idx]
  return randChord
}

const getRandomChord = notesInChord => {
  console.log('Using old getRandomChord method')
  let result = []
  const startNum = randomIntegerBetween(1, 8)
  let thisNum = startNum
  for (let nNum=1; nNum<=notesInChord; nNum++) {
    const diff = randomIntegerBetween(1, 3)
    thisNum += diff
    result.push(thisNum)
  }
  // result.sort((a,b)=>a-b)    // With a diff, sorting not needed
  let gcdResult = result[0]
  result.forEach(elt => gcdResult = gcd(gcdResult, elt))
  // if (gcdResult > 1) console.log('GCD match found', result, gcdResult)  // DEBUG ONLY
  if (gcdResult > 1) result = result.map(elt => elt / gcdResult)
  return result
}

export const initialisePicklistFromId = id => controlSetupArray.find( picklist => picklist.id === id )
