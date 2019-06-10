import React from 'react'
import { Column, Row } from 'simple-flexbox'

import PicklistC from './PicklistC'
import QuestionC from './QuestionC'
import ButtonC from './ButtonC'

import { FINISH_TEST } from '../constants'


const TakeTest = obj => (
  <Column className='ModeComponent' horizontal='center'>
    <Row>
      <PicklistC picklist={obj.playbackSpeedPicklist} />
    </Row>
    Put stats here: number of chords, number of ticks, max complexity...
    {
      obj.questions.map( question =>
        <QuestionC
          key={question.qNum}
          question={question}
        />
      )
    }
    <Row>
      <ButtonC id={FINISH_TEST} label={'Finish test'} />
    </Row>
  </Column>
)

export default TakeTest
