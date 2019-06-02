import React from 'react'
import { Column, Row } from 'simple-flexbox'

import ButtonC from './ButtonC'
import QuestionC from './QuestionC'

import { START_TEST } from '../constants/actionTypes'


const Test = ({ setup, results, questions }) => (
  <Column className='Test' horizontal='center'>
    <Row>
      Identify chords and intervals in Just Intonation
    </Row>
    <Row>
      <ButtonC id={START_TEST} label={'Start new test'} />
    </Row>
    {questions.map( question =>
      <QuestionC
        key={question.qNum}
        question={question}
      />
    )}
    <Row>
      Your test results are a score of {100} out of {100}
    </Row>
  </Column>
)

export default Test
