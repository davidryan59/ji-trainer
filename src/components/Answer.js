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

const answerStylesDisabled = {
  color:'#AAA',
  backgroundColor:'#EEE',
  padding:'3px 7px',
  margin:'0px 2px'  
}

const answerStylesEnabled = {
  color:'#080',
  backgroundColor:'#EFE',
  padding:'3px 7px',
  margin:'0px 2px'
}

const Answer = ({ answer, userAnswerNum, correctAnswerNum, questionHasPlayed }) => (
  <Column className={`Answer ${calculateClassName(answer.aNum, userAnswerNum, correctAnswerNum)}`} flex='5'>
    <Row vertical='center'>
      <Column style={{margin:'0px 7px'}}>
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
            charCodeArray={['10003']}
            data={{qNum:answer.qNum, aNum:answer.aNum}}
            disabled={!questionHasPlayed}
            inlineStyles={(questionHasPlayed) ? answerStylesEnabled : answerStylesDisabled}
          />
        </Column>
      }
    </Row>
  </Column>
)

export default Answer
