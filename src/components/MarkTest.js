import React from 'react'
import { Column, Row } from 'simple-flexbox'

import ButtonC from './ButtonC'

import { FINISH_REVIEW } from '../constants'


const MarkTest = ({ setupSummary }) => (
  <Column className='ModeComponent' horizontal='center'>
    <Row>
      <ButtonC id={FINISH_REVIEW} label={'Finish reviewing test'} data={setupSummary} />
    </Row>
  </Column>
)

export default MarkTest
