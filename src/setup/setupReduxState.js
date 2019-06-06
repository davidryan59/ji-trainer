import { NOTES_IN_CHORD } from '../constants'

import { defaultNumberOfNotes, defaultNumberOfAnswers } from '../_params'

import { randomIntegerBetween, gcd } from '../maths'
import { getChords } from '../chords'
import { picklistSetupArray } from '../picklists'


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
console.log(sbArrayFor2Notes)


// 4 notes

const arrayFor4Notes = getChords({
  maxComplexity: 1080,
  maxLoops: 500000,
  minInterval: 4/3,
  maxChordInterval: 4/1
}).chords


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
  const numberOfAnswers = defaultNumberOfAnswers
  const notesInChord = actionData[NOTES_IN_CHORD] || defaultNumberOfNotes
  const result = {
    qNum,
    userAnswer: null,
    correctAnswer: randomIntegerBetween(1, numberOfAnswers),
    answers: []
  }
  let randomSternBrocotPosition, answerFraction
  if (notesInChord === 2) {
    // Use Stern-Brocot tree
    randomSternBrocotPosition = randomIntegerBetween(0, sbArrayFor2Notes.length - numberOfAnswers)
  }
  for (let aNum=1; aNum<=numberOfAnswers; aNum++) {
    if (notesInChord === 2) {
      // Use Stern-Brocot tree
      answerFraction = sbArrayFor2Notes[randomSternBrocotPosition + aNum - 1]
    }
    result.answers.push(getNewAnswer({qNum, aNum, notesInChord, answerFraction}))
  }
  return result
}

const getNewAnswer = ({ qNum, aNum, notesInChord, answerFraction }) => {
  const chord = (answerFraction) ? [answerFraction[1], answerFraction[0]] : getRandomChord(notesInChord)
  const result = {
    qNum,
    aNum,
    chord
  }
  return result
}

const getRandomChord = notesInChord => {
  if (notesInChord === 4) return arrayFor4Notes[Math.floor(Math.random() * arrayFor4Notes.length)]
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

export const initialisePicklistFromId = id => picklistSetupArray.find( picklist => picklist.id === id )
