import React from 'react'
import { render } from 'react-dom'
import { createStore, applyMiddleware } from 'redux'
import thunk from 'redux-thunk'
import { Provider } from 'react-redux'

import AppC from './components/AppC'
import appReducer from './reducers'
import setupObjectStore from './setup/setupObjectStore'
import windowResizeHandler from './handlers/windowResizeHandler'

const objStore = {}
const reduxStore = createStore(appReducer, applyMiddleware(thunk.withExtraArgument(objStore)))

render(
  <Provider store={reduxStore}>
    <AppC />
  </Provider>,
  document.getElementById('root')
)

// Can only initialise object store once page elements are available
window.addEventListener('load', () => {
  setupObjectStore(objStore, reduxStore)
})

// If window resizes, that has an additional action 
window.addEventListener('resize', e => windowResizeHandler(e, reduxStore))
