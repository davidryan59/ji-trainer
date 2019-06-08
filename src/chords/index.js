import * as prm from '../_params'
import { nbsp } from '../constants'

import { ratioToCents, factorArray, arrayGcd, arrayLcm } from '../maths'


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


// Generate new chords

const validateData = dt => {
  dt.chords = dt.chords || []
  dt.maxChords = dt.maxChords || prm.defaultMaxChords
  dt.currentLoops = dt.currentLoops || 1
  dt.maxLoops = dt.maxLoops || prm.defaultMaxLoops
  dt.maxComplexity = dt.maxComplexity || prm.defaultMaxComplexity
  dt.numberOfNotes = dt.numberOfNotes || prm.defaultNumberOfNotes
  dt.minInterval = dt.minInterval || prm.defaultMinInterval
  dt.maxInterval = dt.maxInterval || prm.defaultMaxInterval
  dt.minChordInterval = dt.minChordInterval || prm.defaultMinChordInterval
  dt.maxChordInterval = dt.maxChordInterval || prm.defaultMaxChordInterval
}

const hasFinished = dt => {
  if (dt.maxChords <= dt.chords.length) return true
  if (dt.maxLoops <= dt.currentLoops) return true
  if (dt.maxComplexity < dt.currentComplexity) return true
  return false
}

const isComplexityValid = (cy, includePrimes, excludePrimes) => {
  if (!Number.isInteger(cy) || cy < 1) return false
  if (Array.isArray(includePrimes) && includePrimes.length > 0) {
    let remainder = cy
    for (let prime of includePrimes) while (1 < prime && 1 < remainder && remainder % prime === 0) remainder /= prime
    if (!(remainder === 1)) return false
  } else if (Array.isArray(excludePrimes) && excludePrimes.length > 0) {
    for (let prime of excludePrimes) if (cy % prime === 0) return false
  }
  return true
} 

const addChordsOfComplexity = dt => {
  // Sense checks
  validateData(dt)
  if (hasFinished(dt)) return dt
  if (!isComplexityValid(dt.currentComplexity, dt.primesToInclude, dt.primesToExclude)) return dt
  const theFactors = factorArray(dt.currentComplexity)
  const countFactors = theFactors.length
  if (countFactors < dt.numberOfNotes) return dt
  // Everything is valid, can iteratively find arrays that match
  let c0 = -1
  for (let c1=c0+1; c1<countFactors-3; c1++) {
    
    if (dt.maxLoops <= dt.currentLoops++) return dt
    const n1 = theFactors[c1]
    // const r10 = n1/n0
    // if (r10 < dt.minInterval) continue
    // if (dt.maxInterval < r10) break
    
    for (let c2=c1+1; c2<countFactors-2; c2++) {
      
      if (dt.maxLoops <= dt.currentLoops++) return dt
      const n2 = theFactors[c2]
      const r21 = n2/n1
      if (r21 < dt.minInterval) continue
      if (dt.maxInterval < r21) break
      
      for (let c3=c2+1; c3<countFactors-1; c3++) {
        
        if (dt.maxLoops <= dt.currentLoops++) return dt
        const n3 = theFactors[c3]
        const r32 = n3/n2
        if (r32 < dt.minInterval) continue
        if (dt.maxInterval < r32) break
        
        for (let c4=c3+1; c4<countFactors-0; c4++) {
          
          if (dt.maxLoops <= dt.currentLoops++) return dt
          const n4 = theFactors[c4]
          const r43 = n4/n3
          if (r43 < dt.minInterval) continue
          if (dt.maxInterval < r43) break
          
          const r41 = n4/n1
          if (r41 < dt.minChordInterval) break
          if (dt.maxChordInterval < r41) break
          
          const arr = [n1, n2, n3, n4]
          const gcd0 = arrayGcd(arr)
          const lcm0 = arrayLcm(arr)
          if (1 < gcd0 || lcm0 < dt.currentComplexity) continue
          dt.chords.push(arr)
          if (dt.maxChords <= dt.chords.length) return dt
        }
      }
    }
  }
  return dt
}

export const getChords = options => {
  const data = {...options}
  for (let cy=0; cy<=data.maxComplexity || prm.defaultMaxComplexity; cy++) {
    data.currentComplexity = cy
    addChordsOfComplexity(data)
    if (hasFinished(data)) break
  }
  return data
}

// // Use this parameter format for getChords.
// // All components are optional.
//
// const outputData = getChords({
//   numberOfNotes: N,
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
