import React from 'react'
import { Column, Row } from 'simple-flexbox'

import ButtonC from './ButtonC'
import AnswerC from './AnswerC'

import { LISTEN_QUESTION } from '../constants/actionTypes'


const Question = ({ qNum }) => (
  <Row className='Question' vertical='center'>
    <Column flex='1'>
      This is question {qNum}
    </Column>
    <Column flex='1'>
      <ButtonC id={LISTEN_QUESTION} label={'Listen'} data={{qNum:qNum}} />
    </Column>
    <AnswerC qNum={qNum} aNum='1' />
    <AnswerC qNum={qNum} aNum='2' />
    <AnswerC qNum={qNum} aNum='3' />
  </Row>
)

export default Question
