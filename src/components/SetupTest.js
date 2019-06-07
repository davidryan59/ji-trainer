import React from 'react'
import { Column, Row } from 'simple-flexbox'

import PicklistC from './PicklistC'
import ButtonC from './ButtonC'

import { START_TEST } from '../constants'


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
    <Row>
      <ButtonC id={START_TEST} label={'Start test'} data={obj.setupSummary} />
    </Row>
  </Column>
)

export default SetupTest
