import React from 'react'
import { Column, Row } from 'simple-flexbox'

import PicklistC from './PicklistC'
import ButtonC from './ButtonC'

import * as cts from '../constants'

const getValidationStyle = canStartTest =>
  canStartTest
  ?
  {color:'#080', fontSize:'90%', marginBottom:'10px'}
  :
  {color:'#B00', fontWeight:'bold', fontSize:'90%', marginBottom:'10px'}


const SetupTest = obj => (
  <Column className='ModeComponent' horizontal='center'>
    <Row vertical='center'>
      <PicklistC picklist={obj.notesInChordPicklist} />
      <PicklistC picklist={obj.maxComplexityPicklist} />
      <Column>
        <Row>
          <PicklistC picklist={obj.maxIntervalPicklist} />
        </Row>
        <Row>
          <PicklistC picklist={obj.minIntervalPicklist} />
        </Row>
      </Column>
      <Column>
        <Row>
          <PicklistC picklist={obj.maxChordIntervalPicklist} />
        </Row>
        <Row>
          <PicklistC picklist={obj.minChordIntervalPicklist} />
        </Row>
      </Column>
    </Row>
    <Row>
      &nbsp;
    </Row>
    {
      obj.validationMessage
      ?
      <Row style={getValidationStyle(obj.canStartTest)} horizontal='center'>
        {obj.validationMessage}
      </Row>
      :
      null        
    }
    {
      !obj.canStartTest
      ?
      <Row horizontal='center'>
        <ButtonC id={cts.VALIDATE_TEST} label={'Generate chords'} data={obj.setupSummary} />
      </Row>
      :
      <Row horizontal='center'>
        <ButtonC id={cts.START_TEST} label={'Start test'} data={obj.setupSummary} />
      </Row>
    }
  </Column>
)

export default SetupTest
