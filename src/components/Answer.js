import React from 'react'
import { Column, Row } from 'simple-flexbox'

import ButtonC from './ButtonC'

const Answer = ({ qNum, aNum }) => (
  <Column className='Answer' flex='1'>
    <Row>
      <Column>
        This is answer {aNum} to question {qNum}
      </Column>
      <Column>
        <ButtonC id={'ANSWER'} charCode={'10003'} data={{qNum:qNum,aNum:aNum}} />
      </Column>
    </Row>
  </Column>
)

export default Answer
