import * as prm from '../../_params'
import { nbsp } from '../../constants'
import { ratioToCents, arrayGcd, arrayLcm } from '../../maths'
import addChords from './addScripts'
import { hasFinished } from './supportScripts'


// Currently a chord is simply an array of integers
// such as [1, 2], [4, 5, 6] or [2, 3, 5, 7, 11, 13]
// Not yet implemented a specific class to handle chords,
// although its an option for the future.


// Mathematical functions on chords
// see 'Mathematical Harmony Analysis' at https://arxiv.org/pdf/1603.08904.pdf
export const log2 = num => Math.log(num) / Math.log(2)
export const complexity = chord => arrayLcm(chord) / arrayGcd(chord)
export const logComplexity = chord => log2(complexity(chord))
const sumLogChord = chord => chord.reduce(
  (acc, curr) => acc + log2(curr)
, 0 )
export const logMidpoint = chord => (sumLogChord(chord) / chord.length) - log2(arrayGcd(chord))
export const otonality = chord => {
  const n = chord.length
  if (n<3) return 0
  const lcy = logComplexity(chord)
  const lm = logMidpoint(chord)
  const result = (n / (n-2)) * (lcy - 2 * lm) / lcy
  return result  
}
export const utonality = chord => -otonality(chord) || 0    // OR condition maps -0 to 0


// Views on chords

export const chordToCentsText = chord => {
  let result = ''
  for (let i=1; i<chord.length; i++) {
    const integerCents = Math.round(ratioToCents(chord[i] / chord[i-1]))
    result += integerCents + ',' + nbsp
  }
  return result.slice(0, result.length - 2) + nbsp + 'c'
}

export const chordToOtonalText = chord => {
  const gcd = arrayGcd(chord)
  const chordOtonal = chord.map( elt => elt / gcd )
  return chordOtonal.toString().replace(/,/g,':')
}

export const chordToUtonalText = chord => {
  const lcm = arrayLcm(chord)
  const chordUtonal = chord.map( elt => lcm / elt )
  return chordToOtonalText(chordUtonal)
}

export const chordToRatioDisplayInfo = chord =>
  utonality(chord) > 0
  ? [chordToUtonalText(chord), true]
  : [chordToOtonalText(chord), false]

export const calcCanStartTest = chordData => {
  if (!chordData || !chordData.chords) return [false, '']    // Chord data not generated, exit silently
  const chordsArray = chordData.chords
  const len = chordsArray.length
  const chordFoundMessage = `${len} chord${len===1?'':'s'} found`
  let canStartTest = false
  let validationMessage = ''
  if (len < prm.minChordsForTest) {
    validationMessage = `${chordFoundMessage}, need ${prm.minChordsForTest} for test`
  } else {
    canStartTest = true
    validationMessage = `${chordFoundMessage}, ready to start test`
  }
  return [canStartTest, validationMessage]
}


// Generate new chords according to supplied options
let generateId = 1
export const getChordData = options => {
  const data = {...options}
  data.generateId = generateId++
  for (let cy=0; cy<=data.maxComplexity || prm.defaultMaxComplexity; cy++) {
    data.currentComplexity = cy
    addChords(data)
    if (hasFinished(data)) break
  }
  console.log('Chord data', data)
  return data
}

// // Use this parameter format for getChordData.
// // All components are optional.
//
// const outputData = getChordData({
//   notesInChord: N,
//   maxLoops: N,
//   maxChords: N,
//   maxComplexity: N,
//   primesToInclude: [p1, p2...],     // Use only one of these two rows
//   primesToExclude: [p1, p2...],     // Use only one of these two rows
//   minInterval: N,
//   maxInterval: N,
//   minChordInterval: N,
//   maxChordInterval: N
// })


// Chord calculations

// Turns chord(Array) such as [2, 3, 4]
// into a standard pitch array similar to [-0.6, 0.1, 0.5]
export const getChordPitches = chord => {
  let chordP = chord.map( elt => Math.log(elt) / Math.log(2) )
  const sumPitch = chordP.reduce( (acc, curr) => acc + curr )
  const avgPitch = sumPitch / chord.length
  chordP = chordP.map( elt => elt - avgPitch )
  return chordP  
}

// Measures the distance (in cents) between two standard pitch arrays
// It is Pythagorean distance between standard pitches,
// divided by number of degrees of freedom (which is N-1 for an N note chord)
export const getDistanceCents = (chordP1, chordP2) => {
  const degreesOfFreedom = chordP1.length - 1
  const pitchesDiff = chordP1.map( (elt1, idx) => elt1 - chordP2[idx] )
  const sumSq = pitchesDiff.reduce( (acc, curr) => acc + curr * curr, 0 )
  const result = 1200 * (sumSq ** 0.5) / Math.max(1, degreesOfFreedom)
  return result
}

// For next two functions, assuming:
// - each element of chordsArray is a chord, a numeric array in ascending order
// - each chord has the same length

export const getMinDistanceCents = chordsArray => {
  const chordPitchesArray = chordsArray.map( chord => getChordPitches(chord) )
  const numChords = chordPitchesArray.length
  let minDistAll = 1e15
  for (let i=0; i<numChords-1; i++) {
    for (let j=i+1; j<numChords; j++) {
      const newDist = getDistanceCents(chordPitchesArray[i], chordPitchesArray[j])  // newDist :D
      minDistAll = Math.min(minDistAll, newDist)
    }
  }
  return minDistAll
}

export const getMinDistanceCentsFrom = (chordsArray, idx) => {
  const chordPitchesArray = chordsArray.map( chord => getChordPitches(chord) )
  const chordP = chordPitchesArray[idx]
  const filteredArray = chordPitchesArray.filter( (elt, fidx) => idx !== fidx )
  const result = filteredArray.reduce( (acc, currPitch) => Math.min(acc, getDistanceCents(chordP, currPitch)), 1e15 )
  return result
}

export const chordSortingFunction = chord => {
  // Measure (used to compare multiple chords) is based on
  // transposing chords to have same bottom note
  // and measuring how much higher all the other notes are.
  let chordP = getChordPitches(chord)
  const firstElt = chordP[0]
  chordP = chordP.map( elt => elt - firstElt )  // Now its based at zero
  const result = chordP.reduce( (acc, curr) => acc + curr )
  return result
}
