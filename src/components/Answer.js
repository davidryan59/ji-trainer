import React from 'react'
import { Column, Row } from 'simple-flexbox'

import ButtonC from './ButtonC'

import { SELECT_ANSWER, nbsp } from '../constants'


const calculateCssClass = (aNum, uNum, cNum) => {
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

const Answer = ({ noteCount, cy, otc, utc, setupSummary, answer, userAnswerNum, correctAnswerNum, questionHasPlayed, displayRatios, isUtonal, displayCents }) => (
  <Column className={`Answer ${calculateCssClass(answer.aNum, userAnswerNum, correctAnswerNum)}`} flex='5'>
    <Row vertical='center'>
      <Column style={{margin:'0px 7px'}} horizontal='center'>
        {
          isUtonal
          ?
          <div>
            <Row style={{fontSize:'90%', margin:'0px', fontWeight:'bold'}} horizontal='center'>
              {'1'}
            </Row>          
            <Row style={{fontSize:'100%', fontWeight:'bold', margin:'2px', borderTop:'1px solid #000'}}>
              {displayRatios}
            </Row>
          </div>          
          :
          <Row style={{fontSize:'110%', fontWeight:'bold', margin:'2px'}}>
            {displayRatios}
          </Row>          
        }
        <Row style={{color:'#008', fontSize:'80%', marginTop:'1px', marginBottom:'4px'}}>
          {displayCents}
        </Row>
        <Row style={{fontSize:'80%', fontStyle:'italic'}}>
          <span style={{color:'#060'}}>
            CY{nbsp + cy}
          </span>
          {
            noteCount > 2
            ?
            <span>
            ,{nbsp}
              {
                isUtonal
                ?
                <span style={{color:'#608'}}>
                  {`UTC${nbsp + utc}`}
                </span>                
                :
                <span style={{color:'#560'}}>
                  {`OTC${nbsp + otc}`}
                </span>
              }
            </span>
            : 
            null
          }
        </Row>
      </Column>
      {
        userAnswerNum
        ?
        null
        : 
        <Column>
          <ButtonC
            id={SELECT_ANSWER}
            charCodeArray={['10003']}
            data={{...setupSummary, qNum:answer.qNum, aNum:answer.aNum}}
            disabled={!questionHasPlayed}
            inlineStyles={questionHasPlayed ? answerStylesEnabled : answerStylesDisabled}
          />
        </Column>
      }
    </Row>
  </Column>
)

export default Answer
