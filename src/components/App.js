import React from 'react'

import TestC from './TestC'
import StateViewerC from './StateViewerC'


const App = () => (
  <div className='app'>
    <div className='topline'>
      <b>Just Intonation Ear Trainer</b> - <i>by David Ryan, 2019</i>
    </div>
    <TestC />
    <StateViewerC />
  </div>
)

export default App
