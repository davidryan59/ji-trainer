import React from 'react'
import { Column, Row } from 'simple-flexbox'

import PicklistC from './PicklistC'
import CheckboxC from './CheckboxC'
import QuestionC from './QuestionC'
import ButtonC from './ButtonC'

import { FINISH_TEST } from '../constants'


const TakeTest = obj => (
  <Column className='ModeComponent' horizontal='center'>
    Chords found {obj.chordData.chords.length}, 
    Complexity up to   {obj.chordData.currentComplexity}, 
    Loops {obj.chordData.currentLoops}
    <Row>
      <PicklistC picklist={obj.playbackSpeedPicklist} />
    </Row>
    <Row>
      <CheckboxC checkbox={obj.utonalDisplayCheckbox} />
    </Row>
    Difficulty: cents difference of {obj.targetCents.toFixed(2)}.
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
