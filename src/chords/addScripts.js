import { validateData, hasFinished, isComplexityValid } from './supportScripts'
import { factorArray, arrayGcd, arrayLcm } from '../maths'


const addChords = dt => {
  // Sense checks
  validateData(dt)
  if (hasFinished(dt)) return dt
  if (!isComplexityValid(dt)) return dt
  dt.currFactors = factorArray(dt.currentComplexity)
  dt.countFactors = dt.currFactors.length
  if (dt.countFactors < dt.notesInChord) return dt
  // Everything is valid, can iteratively find arrays that match
  
  // NEED TO REFACTOR THIS INTO A SINGLE ITERATIVE FUNCTION
  switch (dt.notesInChord) {
    case 2:
      return addChordsLength2(dt)
    case 3:
      return addChordsLength3(dt)
    case 4:
      return addChordsLength4(dt)
    case 5:
      return addChordsLength5(dt)
    case 6:
      return addChordsLength6(dt)
    default:
      return addChordsLength4(dt)
  }
}

export default addChords


const addChordsLength2 = dt => dt
const addChordsLength3 = dt => dt
const addChordsLength5 = dt => dt
const addChordsLength6 = dt => dt


const addChordsLength4 = dt => {
  let c0 = -1
  for (let c1=c0+1; c1<dt.countFactors-3; c1++) {
    
    if (dt.maxLoops <= dt.currentLoops++) return dt
    const n1 = dt.currFactors[c1]
    // const r10 = n1/n0
    // if (r10 < dt.minInterval) continue
    // if (dt.maxInterval < r10) break
    
    for (let c2=c1+1; c2<dt.countFactors-2; c2++) {
      
      if (dt.maxLoops <= dt.currentLoops++) return dt
      const n2 = dt.currFactors[c2]
      const r21 = n2/n1
      if (r21 < dt.minInterval) continue
      if (dt.maxInterval < r21) break
      
      for (let c3=c2+1; c3<dt.countFactors-1; c3++) {
        
        if (dt.maxLoops <= dt.currentLoops++) return dt
        const n3 = dt.currFactors[c3]
        const r32 = n3/n2
        if (r32 < dt.minInterval) continue
        if (dt.maxInterval < r32) break
        
        for (let c4=c3+1; c4<dt.countFactors-0; c4++) {
          
          if (dt.maxLoops <= dt.currentLoops++) return dt
          const n4 = dt.currFactors[c4]
          const r43 = n4/n3
          if (r43 < dt.minInterval) continue
          if (dt.maxInterval < r43) break
          
          const chordArray = [n1, n2, n3, n4]
          const ratioEnds = n4/n1
          
          if (ratioEnds < dt.minChordInterval) break
          if (dt.maxChordInterval < ratioEnds) break
          const gcd0 = arrayGcd(chordArray)
          const lcm0 = arrayLcm(chordArray)
          if (1 < gcd0 || lcm0 < dt.currentComplexity) continue
          dt.chords.push(chordArray)
          if (dt.maxChords <= dt.chords.length) return dt
        }
      }
    }
  }
  return dt
}
