import React from 'react'
import { Column, Row } from 'simple-flexbox'

import ButtonC from './ButtonC'

import { SELECT_ANSWER } from '../constants/actionTypes'
import { chordArrayToCompoundRatio, chordPairToCents } from '../maths'


const selectOutputFormat = chord => (chord.length === 2) ? chordPairToCents(chord) : chordArrayToCompoundRatio(chord)

const calculateClassName = (aNum, uNum, cNum) => {
  if (!uNum) return 'AnswerAwaitingSelection'
  if (aNum === cNum && cNum === uNum) return 'AnswerCorrectSelection'
  if (aNum === cNum && cNum !== uNum) return 'AnswerCorrectNotSelected'
  if (aNum === uNum) return 'AnswerIncorrectSelection'
  return 'AnswerOther'
}

const Answer = ({ answer, userAnswerNum, correctAnswerNum }) => (
  <Column className={`Answer ${calculateClassName(answer.aNum, userAnswerNum, correctAnswerNum)}`} flex='5'>
    <Row vertical='center'>
      <Column>
        {selectOutputFormat(answer.chord)}
      </Column>
      {
        (userAnswerNum)
        ?
        null
        : 
        <Column>
          <ButtonC
            id={SELECT_ANSWER}
            charCode={'10003'}
            data={{qNum:answer.qNum, aNum:answer.aNum}}
            inlineStyles={{color:'#080', backgroundColor:'#EFE', padding:'3px 7px', margin:'0px 2px'}}
          />
        </Column>
      }
    </Row>
  </Column>
)

export default Answer
