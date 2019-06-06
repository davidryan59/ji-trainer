import React from 'react'
import { Column, Row } from 'simple-flexbox'

import ButtonC from './ButtonC'

import { SELECT_ANSWER } from '../constants'
import { chordArrayToCompoundRatio, chordArrayToCents } from '../chords'


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

const Answer = ({ setupSummary, answer, userAnswerNum, correctAnswerNum, questionHasPlayed }) => (
  <Column className={`Answer ${calculateClassName(answer.aNum, userAnswerNum, correctAnswerNum)}`} flex='5'>
    <Row vertical='center'>
      <Column style={{margin:'0px 7px'}} horizontal='center'>
        <Row style={{fontSize:'110%', fontWeight:'bold', margin:'2px'}}>
          {chordArrayToCompoundRatio(answer.chord)}
        </Row>
        <Row style={{fontSize:'80%'}}>
          {chordArrayToCents(answer.chord)}
        </Row>
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
            data={{...setupSummary, qNum:answer.qNum, aNum:answer.aNum}}
            disabled={!questionHasPlayed}
            inlineStyles={(questionHasPlayed) ? answerStylesEnabled : answerStylesDisabled}
          />
        </Column>
      }
    </Row>
  </Column>
)

export default Answer
