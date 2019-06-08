import { validateData, hasFinished, isComplexityValid } from './supportScripts'
import { last, factorArray, arrayGcd, arrayLcm } from '../maths'


const addChords = dt => {
  validateData(dt)
  if (hasFinished(dt)) return dt
  if (!isComplexityValid(dt)) return dt
  const countNotes = dt.notesInChord
  dt.currentFactors = factorArray(dt.currentComplexity)
  dt.countFactors = dt.currentFactors.length
  if (dt.countFactors < countNotes) return dt
  dt.currentFactorIndices = new Array(countNotes)  // Positions in factor array, from 0 to factor count - 1
  dt.currentNotes = new Array(countNotes)          // Numbers from factor array, making up chord
  return addChordsInner(dt, 0)
}

export default addChords


const addChordsInner = (dt, noteIdx) => {
  const prevFactorIndex = noteIdx === 0 ? -1 : dt.currentFactorIndices[noteIdx - 1]
  // noteIdx starts at 0 (first note), and ends at dt.notesInChord - 1 (last note)
  const lastNoteIdx = dt.notesInChord - 1
  const factorIndexLimit = dt.countFactors + noteIdx - lastNoteIdx
  for (let currentFactorIndex = prevFactorIndex + 1; currentFactorIndex < factorIndexLimit; currentFactorIndex++) {
    if (dt.maxChords <= dt.chords.length || dt.maxLoops <= dt.currentLoops++) break
    dt.currentFactorIndices[noteIdx] = currentFactorIndex
    dt.currentNotes[noteIdx] = dt.currentFactors[currentFactorIndex]
    if (noteIdx > 0) {
      const intervalToPrevNote = dt.currentNotes[noteIdx] / dt.currentNotes[noteIdx - 1]
      if (intervalToPrevNote < dt.minInterval) continue
      if (dt.maxInterval < intervalToPrevNote) break
    }
    if (noteIdx < lastNoteIdx) {
      // Too few notes chosen - iterate.
      addChordsInner(dt, noteIdx + 1)
    } else {
      // All notes now chosen - final checks.
      // Check chord is not too big or too smal
      const chordInterval = last(dt.currentNotes) / dt.currentNotes[0]
      if (chordInterval < dt.minChordInterval) continue
      if (dt.maxChordInterval < chordInterval) break
      // Check chord complexity level matches current level
      // to prevent same chord being found at different complexity levels
      const gcd0 = arrayGcd(dt.currentNotes)
      const lcm0 = arrayLcm(dt.currentNotes)
      if (1 < gcd0 || lcm0 < dt.currentComplexity) continue
      // All notes chosen, all validations passed. Store the chord!
      // Must save a copy, since array is shared.
      dt.chords.push([...dt.currentNotes])
    }
  }
  return dt
}
