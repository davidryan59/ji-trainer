import React from 'react'
import { Column, Row } from 'simple-flexbox'

import ButtonC from './ButtonC'
import QuestionC from './QuestionC'

import { START_TEST, FINISH_TEST } from '../constants/actionTypes'


const Test = () => (
  <Column className='Test' horizontal='center'>
    <Row>
      Identify chords and intervals in Just Intonation
    </Row>
    <Row>
      <ButtonC id={START_TEST} label={'Start new test'} />
    </Row>
    <QuestionC qNum='1' />
    <QuestionC qNum='2' />
    <Row>
      <ButtonC id={FINISH_TEST} label={'Mark this test'} />
    </Row>
    <Row>
      Your test results are a score of {100} out of {100}
    </Row>
  </Column>
)

export default Test
