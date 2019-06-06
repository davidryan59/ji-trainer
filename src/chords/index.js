import * as prm from '../_params'

import { ratioToCents, factorArray, arrayGcd, arrayLcm } from '../maths'


// Views on chords
const nbsp = String.fromCharCode(8239)

export const chordArrayToCents = chordArray => {
  let result = ''
  for (let i=1; i<chordArray.length; i++) {
    const integerCents = Math.round(ratioToCents(chordArray[i] / chordArray[i-1]))
    result += integerCents + ',' + nbsp
  }
  return result.slice(0, result.length - 2) + nbsp + 'c'
}

export const chordArrayToCompoundRatio = chordArray => chordArray.toString().replace(/,/g,':')


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
