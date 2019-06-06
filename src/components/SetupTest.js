import React from 'react'
import { Column, Row } from 'simple-flexbox'

import PicklistC from './PicklistC'
import ButtonC from './ButtonC'

import { START_TEST } from '../constants'


const SetupTest = ({ notesInChordPicklist, setupSummary }) => (
  <Column className='ModeComponent' horizontal='center'>
    <Row>
      <PicklistC picklist={notesInChordPicklist} />
    </Row>
    <Row>
      <ButtonC id={START_TEST} label={'Start test'} data={setupSummary} />
    </Row>
  </Column>
)

export default SetupTest
