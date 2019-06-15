import { randomIntegerBetween } from '../maths'
import * as chd from './chord'
import * as prm from '../_params'

export const getNextBaseFreqHz = question => {
  // If question has been answered, don't change its playback frequency
  if (question.userAnswer && question.baseFreqHz) return question.baseFreqHz
  // Otherwise going to construct a random frequency to play at
  const answer = question.answers.find( ans => ans.aNum === question.correctAnswer )
  // Set up the chord frequencies
  const chord = answer.chord
  const chordTotalRatio = chord[chord.length - 1] / chord[0]
  const chordLimitRatio = prm.playNoteMaxHz / prm.playNoteMinHz
  const baseRatio = Math.max(1, chordLimitRatio / chordTotalRatio)   // Specifies maximum random shift in frequency ratio
  const baseFreqHz = prm.playNoteMinHz * (baseRatio ** Math.random()) / chord[0]
  return baseFreqHz
}

const bandingPotentialFunction = (chordP1, chordP2, bandStartCents, bandEndCents, extPot, intPot) => {
  // Create a potential function with 3 cases:
  // SURFACE (band start to band end)
  // EXTERIOR (outside band end)
  // INTERIOR (inside band start)
  const actualCents = chd.getDistanceCents(chordP1, chordP2)
  return (actualCents < bandStartCents)
  ? intPot + 9 * intPot * (bandStartCents - actualCents) / bandStartCents  // between intPot and 10 * intPot
  : (bandEndCents < actualCents)
  ? extPot
  : 0
}

const getSubsetOfChordsForQuestion = (chordsArray, numberOfAnswers, targetCents) => {
  console.log('')
  console.log(`Constructing question by choosing suitable subset of chords as answers`)
  
  const countChords = chordsArray.length
  const notesInChord = chordsArray[0].length
  console.log(`There are ${countChords} chords in total, each has ${notesInChord} notes, and there will be ${numberOfAnswers} answers`)
  
  const targetOuterCents = targetCents * (1 + prm.surfaceLayerProportion) ** (1 / (notesInChord - 1))
  console.log(`Aiming for each next chord between ${targetCents} and ${targetOuterCents.toFixed(2)} cents from previous chord`)
  
  // For each chord, convert it to standard pitches (for distance calculations)
  // and also store its (log) complexity (for giving preference to low complexity)
  let chordsWithMeasures = chordsArray.map( chord => {       // chord:   array of positive integers
    const pitches = chd.getChordPitches(chord)  // pitches: array of decimals
    const lcy = chd.logComplexity(chord)                      // lcy:     decimal, non-negative
    const rand = Math.random()                                // rand:    random decimal between 0 and 1  
    const chordWithMeasure = [chord, pitches, lcy, rand]
    return chordWithMeasure
  })

  // logComplexity (LCY) is non-negative.
  // Need to find the highest value to use in potential function
  const maxLCY = chordsWithMeasures.reduce(
    (acc, chordWithMeasure) => Math.max(acc, chordWithMeasure[2])
  , 0)
  console.log(`Maximum LCY is ${maxLCY.toFixed(2)} (max CY is ${Math.round(2 ** maxLCY)})`)
  

  // --------------------------------------------------------------------------------------------
  // SETUP HELPER FUNCTIONS HERE
  
  // 1. Function to use inside chordsWithMeasures.forEach
  // to change all other elements' potential according to potential from a fixed element.
  // Use factor -1 to remove a potential (after adding it temporarily)
  const addPotential = (fixedCWM, factor=1) => loopedCWM =>
    loopedCWM[2] += factor * bandingPotentialFunction(
      fixedCWM[1],
      loopedCWM[1],
      targetCents,
      targetOuterCents,
      maxLCY,
      maxLCY * numberOfAnswers
    )
    
  // 2. Function to use inside chordsWithMeasures.find (or .findIndex)
  // to locate a fixed element (or its index)
  const findCWM = fixedCWM => loopedCWM => loopedCWM[0] === fixedCWM[0]   // this works on chords, since arrays have same object identity!
  
  // 3. Function to find the remaining chordWithMeasure with lowest potential,
  // remove it from the array, and return the chord itself
  const removeLowPotentialCWM = () => {
    // Find element of chordsWithMeasures with lowest potential
    const lowestPotentialCWM = chordsWithMeasures.reduce( (acc, cWM) => cWM[2] < acc[2] ? cWM : acc )
    // Use findIndex then splice to remove this cWM from the array
    const chosenCWMIdx = chordsWithMeasures.findIndex(findCWM(lowestPotentialCWM))
    chordsWithMeasures.splice(chosenCWMIdx, 1)
    // Return the element itself
    return lowestPotentialCWM
  }
  
  // 4. Reporting function
  const describeChord = (aNum, chord) => console.log(`Chord ${aNum} is ${chord} (CY = ${chd.complexity(chord)})`)
  // --------------------------------------------------------------------------------------------
  

  // Filter out fixed proportion of the chords immediately at the start
  // to give randomisation to this question
  chordsWithMeasures = chordsWithMeasures.filter( cWM => cWM[3] > 0.01 * prm.randomFilterPercentage )
  const countFilteredChords = chordsWithMeasures.length
  console.log(`Now have ${countFilteredChords} out of ${countChords} after randomly filtering ${prm.randomFilterPercentage}%`)
  
  // Select any chord at random
  const randomChordIdx = randomIntegerBetween(0, countFilteredChords - 1)
  console.log(`Initial random index is ${randomChordIdx}, range is 0 to ${countFilteredChords - 1}`)
  const randomInitialCWM = chordsWithMeasures.splice(randomChordIdx, 1)[0]
  describeChord('at random', randomInitialCWM[0])
  
  // Use the randomly chosen initial chord to:
  // - Add potential to the set
  // - Choose an actual first chord (with low potential) randomly
  // - Remove potential to the set
  // This allows a low complexity chord to be chosen at random
  chordsWithMeasures.forEach(addPotential(randomInitialCWM))
  let chosenCWM = removeLowPotentialCWM()
  let chosenChord = chosenCWM[0]
  chordsWithMeasures.forEach(addPotential(randomInitialCWM, -1))
  describeChord(1, chosenChord)
  const chordArrayForAnswers = [chosenChord]
  
  for (let aNum=2; aNum <= numberOfAnswers; aNum++) {
    // Answer 1 already selected, selecting answers from 2 to numberOfAnswers
    // 1. Add potential from previous chord to remaining chords
    chordsWithMeasures.forEach(addPotential(chosenCWM))
    // 2. Find cWM with lowest potential
    chosenCWM = removeLowPotentialCWM()
    // 3. Push the wrapped chord into the final array
    chosenChord = chosenCWM[0]
    chordArrayForAnswers.push(chosenChord)
    describeChord(aNum, chosenChord)
  }
  
  for (let i=0; i<chordArrayForAnswers.length - 1; i++) {
    const chordI = chordArrayForAnswers[i]
    const pitchesI = chd.getChordPitches(chordI)
    for (let j=i+1; j<chordArrayForAnswers.length; j++) {
      const chordJ = chordArrayForAnswers[j]
      const pitchesJ = chd.getChordPitches(chordJ)
      const actualCents = chd.getDistanceCents(pitchesI, pitchesJ)
      const targetText = (actualCents < targetCents)
        ? "INTERIOR"
        : (targetOuterCents < actualCents)
        ? "        "
        : "(target)"
      console.log(`${i+1} ${j+1} ${Math.round(actualCents)} ${targetText} from ${chordI} to ${chordJ}`)
    }
  }
  
  return chordArrayForAnswers
}


let nextQuestionNumber = 1

export const getNextQuestion = (topState, qNumInput) => {
  // If qNumInput is used, it resets question numbering.
  // Otherwise, leave it blank.  
  let qNum = nextQuestionNumber++
  if (qNumInput) {
    qNum = qNumInput
    nextQuestionNumber = qNumInput + 1
  }
  
  // Variable to hold question as it is constructed
  const numberOfAnswers = prm.defaultNumberOfAnswers
  const result = {
    qNum,
    userAnswer: null,
    correctAnswer: randomIntegerBetween(1, numberOfAnswers),
    answers: []
  }  
  
  // Access set of all chords, construct set of answers to match current difficulty
  const chordsArray = topState.test.chordData.chords
  const targetCents = topState.test.targetCents
  const chordArrayChosenSubset = getSubsetOfChordsForQuestion(chordsArray, numberOfAnswers, targetCents)
  for (let aNum=1; aNum<=numberOfAnswers; aNum++) {
    const chord = chordArrayChosenSubset[aNum-1]
    result.answers.push({qNum, aNum, chord})
  }
  
  // Sort in increasing order - chords with lower notes go first
  result.answers.sort( (ans1, ans2) =>
    chd.chordSortingFunction(ans1.chord) - chd.chordSortingFunction(ans2.chord)
  )
  
  // Calculate stats
  const chordArrayFromAnswers = result.answers.map( answer => answer.chord )
  result.minDistAll = chd.getMinDistanceCents(chordArrayFromAnswers)
  result.minDist = chd.getMinDistanceCentsFrom(chordArrayFromAnswers, result.correctAnswer - 1)
  
  // Return the newly constructed question
  return result
}
