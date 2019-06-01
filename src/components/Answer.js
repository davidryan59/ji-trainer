import React from 'react'

import ButtonC from './ButtonC'

const Answer = ({ qNum, aNum }) => (
  <div className='Answer'>
    This is answer {aNum} to question {qNum}
    <ButtonC id={'ANSWER'} charCode={'10003'} data={{qNum:qNum,aNum:aNum}} />
  </div>
)

export default Answer
