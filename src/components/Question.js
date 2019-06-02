import React from 'react'
import { Column, Row } from 'simple-flexbox'

import ButtonC from './ButtonC'
import AnswerC from './AnswerC'

import { LISTEN_QUESTION } from '../constants/actionTypes'


const Question = ({ question }) => (
  <Row className='Question' vertical='center'>
    <Column flex='1'>
      {question.qNum})
    </Column>
    <Column flex='1'>
      <ButtonC id={LISTEN_QUESTION} label={'Listen'} data={{qNum:question.qNum}} />
    </Column>
    {question.answers.map( answer =>
      <AnswerC
        key={answer.aNum}
        answer={answer}
      />
    )}
    <Column flex='1'>
      Correct answer is {question.correctAnswer}
    </Column>
  </Row>
)

export default Question
