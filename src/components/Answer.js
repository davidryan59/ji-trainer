import React from 'react'
import { Column, Row } from 'simple-flexbox'

import ButtonC from './ButtonC'

import { SELECT_ANSWER } from '../constants/actionTypes'
import { chordArrayToCompoundRatio } from '../maths'


const calculateClassName = (aNum, uNum, cNum) => {
  if (!uNum) return 'AnswerAwaitingSelection'
  if (aNum === cNum && cNum === uNum) return 'AnswerCorrectSelection'
  if (aNum === cNum && cNum !== uNum) return 'AnswerCorrectNotSelected'
  if (aNum === uNum) return 'AnswerIncorrectSelection'
  return 'AnswerOther'
}

const Answer = ({ answer, userAnswerNum, correctAnswerNum }) => (
  <Column className={`Answer ${calculateClassName(answer.aNum, userAnswerNum, correctAnswerNum)}`} flex='1'>
    <Row vertical='center'>
      <Column>
        {chordArrayToCompoundRatio(answer.chord)}
      </Column>
      {
        (userAnswerNum)
        ?
        null
        : 
        <Column>
          <ButtonC id={SELECT_ANSWER} charCode={'10003'} data={{qNum:answer.qNum,aNum:answer.aNum}} />
        </Column>
      }
    </Row>
  </Column>
)

export default Answer
