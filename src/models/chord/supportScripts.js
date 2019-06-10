import * as prm from '../../_params'


export const validateData = dt => {
  dt.chords = dt.chords || []
  dt.maxChords = dt.maxChords || prm.defaultMaxChords
  dt.currentLoops = dt.currentLoops || 1
  dt.maxLoops = dt.maxLoops || prm.defaultMaxLoops
  dt.maxComplexity = dt.maxComplexity || prm.defaultMaxComplexity
  dt.notesInChord = dt.notesInChord || prm.defaultNotesInChord
  dt.minInterval = dt.minInterval || prm.defaultMinInterval
  dt.maxInterval = dt.maxInterval || prm.defaultMaxInterval
  dt.minChordInterval = dt.minChordInterval || prm.defaultMinChordInterval
  dt.maxChordInterval = dt.maxChordInterval || prm.defaultMaxChordInterval
}

export const hasFinished = dt => {
  if (dt.maxChords <= dt.chords.length) return true
  if (dt.maxLoops <= dt.currentLoops) return true
  if (dt.maxComplexity < dt.currentComplexity) return true
  return false
}

export const isComplexityValid = dt => {
  const cy = dt.currentComplexity
  const includePrimes = dt.primesToInclude
  const excludePrimes = dt.primesToExclude
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
