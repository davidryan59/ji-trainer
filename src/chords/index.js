import * as prm from '../_params'
import { nbsp } from '../constants'
import { ratioToCents, arrayGcd, arrayLcm } from '../maths'
import addChords from './addScripts'
import { hasFinished } from './supportScripts'


// Currently a chord is simply an array of integers
// such as [1, 2], [4, 5, 6] or [2, 3, 5, 7, 11, 13]
// Not yet implemented a specific class to handle chords,
// although its an option for the future.


// Mathematical functions on chords
// see 'Mathematical Harmony Analysis' at https://arxiv.org/pdf/1603.08904.pdf
export const log2 = num => Math.log(num) / Math.log(2)
export const complexity = chordArray => arrayLcm(chordArray) / arrayGcd(chordArray)
export const logComplexity = chordArray => log2(complexity(chordArray))
const sumLogChord = chordArray => chordArray.reduce(
  (acc, curr) => acc + log2(curr)
, 0 )
export const logMidpoint = chordArray => (sumLogChord(chordArray) / chordArray.length) - log2(arrayGcd(chordArray))
export const otonality = chordArray => {
  const n = chordArray.length
  if (n<3) return 0
  const lcy = logComplexity(chordArray)
  const lm = logMidpoint(chordArray)
  const result = (n / (n-2)) * (lcy - 2 * lm) / lcy
  return result  
}
export const utonality = chordArray => -otonality(chordArray) || 0    // OR condition maps -0 to 0


// Views on chords

export const chordArrayToCents = chordArray => {
  let result = ''
  for (let i=1; i<chordArray.length; i++) {
    const integerCents = Math.round(ratioToCents(chordArray[i] / chordArray[i-1]))
    result += integerCents + ',' + nbsp
  }
  return result.slice(0, result.length - 2) + nbsp + 'c'
}

export const chordArrayToOtonalCompoundRatio = chordArray => {
  const gcd = arrayGcd(chordArray)
  const otonalArray = chordArray.map( elt => elt / gcd )
  return otonalArray.toString().replace(/,/g,':')
}

export const chordArrayToUtonalCompoundRatio = chordArray => {
  const lcm = arrayLcm(chordArray)
  const utonalArray = chordArray.map( elt => lcm / elt )
  return chordArrayToOtonalCompoundRatio(utonalArray)
}

export const displayChordArrayRatios = chordArray =>
  utonality(chordArray) > 0
  ? [chordArrayToUtonalCompoundRatio(chordArray), true]
  : [chordArrayToOtonalCompoundRatio(chordArray), false]

export const validateChordData = chordData => {
  if (!chordData || !chordData.chords) return [false, '']    // Chord data not generated, exit silently
  const chordArray = chordData.chords
  const len = chordArray.length
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


// Generate new chords

export const getChordData = options => {
  const data = {...options}
  for (let cy=0; cy<=data.maxComplexity || prm.defaultMaxComplexity; cy++) {
    data.currentComplexity = cy
    addChords(data)
    if (hasFinished(data)) break
  }
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

const getStandardisedPitchArray = chordArray => {
  const pitchArray = chordArray.map( elt => Math.log(elt) / Math.log(2) )
  const sumPitch = pitchArray.reduce( (acc, curr) => acc + curr )
  const avgPitch = sumPitch / chordArray.length
  const standardPitchArray = pitchArray.map( elt => elt - avgPitch )
  return standardPitchArray  
}

const getPitchArrayDistanceCents = (pitch1, pitch2) => {
  const pitchDiff = pitch1.map( (elt1, idx) => elt1 - pitch2[idx] )
  const sumSq = pitchDiff.reduce( (acc, curr) => acc + curr * curr, 0 )
  const result = sumSq ** 0.5
  return 1200 * result
}

// const getChordDistanceCents = (chord1, chord2) => {
//   // Assuming that:
//   // - chord elements are numeric and in ascending order
//   // - chord lengths are the same
//   const pitch1 = getStandardisedPitchArray(chord1)
//   const pitch2 = getStandardisedPitchArray(chord2)
//   return getPitchArrayDistanceCents(pitch1, pitch2)
// }

// For next two functions, assuming:
// - each element of chordArray is a chord, a numeric array in ascending order
// - each chord has the same length

export const getMinCentsBetweenAnyTwoChords = chordArray => {
  const pitchArray = chordArray.map( chord => getStandardisedPitchArray(chord) )
  const numChords = pitchArray.length
  let minDistAll = 1e15
  for (let i=0; i<numChords-1; i++) {
    for (let j=i+1; j<numChords; j++) {
      const newDist = getPitchArrayDistanceCents(pitchArray[i], pitchArray[j])  // newDist :D
      minDistAll = Math.min(minDistAll, newDist)
    }
  }
  return minDistAll
}

export const getMinCentsFromFixedChord = (chordArray, idx) => {
  const pitchArray = chordArray.map( chord => getStandardisedPitchArray(chord) )
  const pitch = pitchArray[idx]
  const pitchArrayFilter = pitchArray.filter( (elt, fidx) => idx !== fidx )
  const result = pitchArrayFilter.reduce( (acc, currPitch) => Math.min(acc, getPitchArrayDistanceCents(pitch, currPitch)), 1e15 )
  return result
}

export const getChordSizeMeasure = chord => {
  // Measure (used to compare multiple chords) is based on
  // transposing chords to have same bottom note
  // and measuring how much higher all the other notes are.
  let pitches = getStandardisedPitchArray(chord)
  const firstElt = pitches[0]
  pitches = pitches.map( elt => elt - firstElt )  // Now its based at zero
  const result = pitches.reduce( (acc, curr) => acc + curr )
  return result
}
