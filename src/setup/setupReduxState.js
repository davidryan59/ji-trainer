import { randomIntegerUpTo, gcd } from '../maths'

export const getInitialWindowState = () => ({
  width: window.innerWidth,
  height: window.innerHeight  
})

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

export const getNewQuestion = qNum => {
  // const numberOfAnswers = 1 + randomIntegerUpTo(5)
  const numberOfAnswers = 6
  // const notesInChord = 1 + randomIntegerUpTo(5)
  const notesInChord = 2
  const result = {
    qNum,
    userAnswer: null,
    correctAnswer: randomIntegerUpTo(numberOfAnswers),
    answers: []
  }
  let randomSternBrocotPosition, answerFraction
  if (notesInChord === 2) {
    // Use Stern-Brocot tree
    randomSternBrocotPosition = randomIntegerUpTo(sbArrayFor2Notes.length - numberOfAnswers + 1) - 1
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
