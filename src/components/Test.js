import React from 'react'
import { Column, Row } from 'simple-flexbox'

import PicklistC from './PicklistC'
import ButtonC from './ButtonC'
import QuestionC from './QuestionC'

import { START_TEST } from '../constants/actionTypes'


const Test = ({ controls, questions }) => (
  <Column className='Test' horizontal='center'>
    <Row>
      <ButtonC id={START_TEST} label={'Start new test'} />
    </Row>
    <Row>
      {Object.entries(controls).map( ([key, value]) =>
        <PicklistC
          key={key}
          picklist={value}
        />
      )}
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
