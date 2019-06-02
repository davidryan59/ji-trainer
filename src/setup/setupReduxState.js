import { defaultNumberOfQuestions, defaultNumberOfAnswers, defaultNotesInChord } from '../constants/general'
import { randomIntegerUpTo } from '../maths'


export const getInitialWindowState = () => ({
  width: window.innerWidth,
  height: window.innerHeight  
})

export const getInitialTestState = () => {
  const numberOfQuestions = defaultNumberOfQuestions
  const result = {
    setup: {
      numberOfQuestions
    },
    questions: [],
    results: {}
  }
  const numberOfAnswers = defaultNumberOfAnswers
  for (let qNum=1; qNum<=numberOfQuestions; qNum++) result.questions.push(getNewQuestion({qNum,aCount:numberOfAnswers}))
  return result
}

const getNewQuestion = ({ qNum, aCount }) => {
  const result = {
    qNum,
    answers: [],
    correctAnswer: randomIntegerUpTo(aCount)
  }
  for (let aNum=1; aNum<=aCount; aNum++) result.answers.push(getNewAnswer({qNum, aNum}))
  return result
}

const getNewAnswer = ({ qNum, aNum }) => {
  const chord = getRandomChord()
  const result = {
    qNum,
    aNum,
    chord
  }
  return result
}

const getRandomChord = () => {
  const notesInChord = defaultNotesInChord
  const result = []
  for (let nNum=1; nNum<=notesInChord; nNum++) result.push(6 + randomIntegerUpTo(16))
  result.sort((a,b)=>a-b)
  return result
}
