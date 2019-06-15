import React from 'react'
import { Column, Row } from 'simple-flexbox'

import ButtonC from './ButtonC'
import AnswerC from './AnswerC'
import QuestionInfoC from './QuestionInfoC'

import { PLAY_AUDIO } from '../constants'
import { getNextBaseFreqHz } from '../models/question'


const calculateCssClass = uNum => uNum ? 'QuestionAnswered' : 'QuestionNotAnswered'

const Question = obj => (
  <Row className={`Question ${calculateCssClass(obj.question.userAnswer)}`} vertical='center'>
    <Column className='QuestionNumber' flex='2'>
      Q{obj.question.qNum}
    </Column>
    <Column flex='3'>
      <ButtonC
        id={PLAY_AUDIO}
        charCodeArray={['9654']}
        data={{qNum:obj.question.qNum, baseFreqHz:getNextBaseFreqHz(obj.question)}}
        disabled={!obj.canPlay}
        inlineStyles={{width:'35px'}}
      />
    </Column>
    {
      obj.question.answers.map( answer =>
        <AnswerC
          key={answer.aNum}
          userAnswerNum={obj.question.userAnswer}
          correctAnswerNum={obj.question.correctAnswer}
          questionHasPlayed={obj.question.hasPlayed}
          answer={answer}
        />
      )
    }
    <Column flex='1'>
      <QuestionInfoC question={obj.question} />
    </Column>
  </Row>
)

export default Question
