import React from 'react'

import ButtonC from './ButtonC'
import QuestionC from './QuestionC'

const Test = () => (
  <div className='Test'>
    <p>Identify chords and intervals in Just Intonation</p>
    <ButtonC id={'START_TEST'} label={'Start new test'} />
    <QuestionC qNum='1' />
    <QuestionC qNum='2' />
    <ButtonC id={'FINISH_TEST'} label={'Mark this test'} />
    <p>Your test results are a score of {100} out of {100}</p>
  </div>
)

export default Test
