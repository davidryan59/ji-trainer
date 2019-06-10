import React from 'react'


const StateViewer = obj => (
  <div className='StateViewer'>
    <p>
      <b>state.lastAction</b>:&nbsp;&nbsp;{obj.actionJSON}
    </p>
    <p>
      <b>state</b>:&nbsp;&nbsp;{obj.stateJSON}
    </p>
  </div>
)

export default StateViewer
