import React from 'react'

import SetupTestC from './SetupTestC'
import TakeTestC from './TakeTestC'
import MarkTestC from './MarkTestC'
import StateViewerC from './StateViewerC'

import { SETUP_TEST, TAKE_TEST, MARK_TEST } from '../constants'


const getComponentInMode = mode => {
  switch (mode) {
    case SETUP_TEST:
      return <SetupTestC />
    case TAKE_TEST:
      return <TakeTestC />
    case MARK_TEST:
      return <MarkTestC />
    default:
      return null
  }  
}

const App = ({ mode }) => (
  <div className='app'>
    <div className='topline'>
      <b>Interval and Chord Trainer for Just Intonation</b> - <i>by David Ryan, 2019</i>
    </div>
    {getComponentInMode(mode)}
    <StateViewerC />
  </div>
)

export default App
