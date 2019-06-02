import { randomIntegerUpTo, gcd } from '../maths'


export const getInitialWindowState = () => ({
  width: window.innerWidth,
  height: window.innerHeight  
})

// export const setupTestQuestions = () => {
//   console.log('Setting up questions for a new test')
//   const result = []
//   const numberOfQuestions = 1 + randomIntegerUpTo(5)
//   for (let qNum=1; qNum<=numberOfQuestions; qNum++) result.push(getNewQuestion(qNum))
//   return result
// }

export const getNewQuestion = qNum => {
  const numberOfAnswers = 1 + randomIntegerUpTo(5)
  const notesInChord = 1 + randomIntegerUpTo(5)
  const result = {
    qNum,
    userAnswer: null,
    correctAnswer: randomIntegerUpTo(numberOfAnswers),
    answers: []
  }
  for (let aNum=1; aNum<=numberOfAnswers; aNum++) result.answers.push(getNewAnswer({qNum, aNum, notesInChord}))
  return result
}

const getNewAnswer = ({ qNum, aNum, notesInChord }) => {
  const chord = getRandomChord(notesInChord)
  const result = {
    qNum,
    aNum,
    chord
  }
  return result
}

const getRandomChord = notesInChord => {
  let result = []
  const startNum = randomIntegerUpTo(8)
  let thisNum = startNum
  for (let nNum=1; nNum<=notesInChord; nNum++) {
    const diff = randomIntegerUpTo(3)
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
