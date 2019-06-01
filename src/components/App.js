import React from 'react'

import ButtonC from './ButtonC'
import StateViewerC from './StateViewerC'

const App = () => (
  <div className='app'>
    <div className='topline'>
      <b>JI Trainer</b> -
      Helps you identify chords and intervals in Just Intonation
      - <i>by David Ryan, 2019</i>
    </div>
    <ButtonC id={'START'} label={'Start new test'} />
    <StateViewerC />
  </div>
)

export default App
