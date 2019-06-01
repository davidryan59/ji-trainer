import React from 'react'

import ButtonC from './ButtonC'
import AnswerC from './AnswerC'

const Question = ({ qNum }) => (
  <div className='Question'>
    This is question {qNum}
    <ButtonC id={'LISTEN'} label={'Listen'} data={{qNum:qNum}} />
    <AnswerC qNum={qNum} aNum='1' />
    <AnswerC qNum={qNum} aNum='2' />
    <AnswerC qNum={qNum} aNum='3' />
  </div>
)

export default Question
