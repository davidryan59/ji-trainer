import React from 'react'
import { Column, Row } from 'simple-flexbox'

import ButtonC from './ButtonC'
import AnswerC from './AnswerC'
import QuestionInfoC from './QuestionInfoC'

import { PLAY_AUDIO } from '../constants'


const calculateClassName = uNum => (uNum) ? 'QuestionAnswered' : 'QuestionNotAnswered'

const Question = ({ canPlay, question }) => (
  <Row className={`Question ${calculateClassName(question.userAnswer)}`} vertical='center'>
    <Column className='QuestionNumber' flex='2'>
      Q{question.qNum}
    </Column>
    <Column flex='3'>
      <ButtonC
        id={PLAY_AUDIO}
        charCodeArray={['9654']}
        data={{qNum:question.qNum}}
        disabled={!canPlay}
        inlineStyles={{width:'35px'}}
      />
    </Column>
    {question.answers.map( answer =>
      <AnswerC
        key={answer.aNum}
        userAnswerNum={question.userAnswer}
        correctAnswerNum={question.correctAnswer}
        questionHasPlayed={question.hasPlayed}
        answer={answer}
      />
    )}
    <Column flex='1'>
      <QuestionInfoC question={question} />
    </Column>
  </Row>
)

export default Question
