import React from 'react'

import SetupTestC from './SetupTestC'
import TakeTestC from './TakeTestC'
import MarkTestC from './MarkTestC'
import StateViewerC from './StateViewerC'

import { showStateViewer } from '../_params'

import * as cts from '../constants'


const getComponentInMode = mode => {
  switch (mode) {
    case cts.SETUP_TEST:
      return <SetupTestC />
    case cts.TAKE_TEST:
      return <TakeTestC />
    case cts.MARK_TEST:
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
    {
      showStateViewer
      ?
      <StateViewerC />
      :
      null
    }
  </div>
)

export default App
