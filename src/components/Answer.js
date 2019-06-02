import React from 'react'
import { Column, Row } from 'simple-flexbox'

import ButtonC from './ButtonC'

import { GIVE_ANSWER } from '../constants/actionTypes'
import { chordArrayToCompoundRatio } from '../maths'


const Answer = ({ answer }) => (
  <Column className='Answer' flex='1'>
    <Row vertical='center'>
      <Column>
        {chordArrayToCompoundRatio(answer.chord)}
      </Column>
      <Column>
        <ButtonC id={GIVE_ANSWER} charCode={'10003'} data={{qNum:answer.qNum,aNum:answer.aNum}} />
      </Column>
    </Row>
  </Column>
)

export default Answer
