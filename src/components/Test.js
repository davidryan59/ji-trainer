import React from 'react'
import { Column, Row } from 'simple-flexbox'

import ButtonC from './ButtonC'
import QuestionC from './QuestionC'

import { START_TEST } from '../constants/actionTypes'


const Test = ({ setup, results, questions }) => (
  <Column className='Test' horizontal='center'>
    <Row>
      <ButtonC id={START_TEST} label={'Start new test'} />
    </Row>
    {questions.map( question =>
      <QuestionC
        key={question.qNum}
        question={question}
      />
    )}
  </Column>
)

export default Test
