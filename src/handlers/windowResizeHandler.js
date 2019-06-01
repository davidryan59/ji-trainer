import { getActionObject } from '../actions'
import { windowSizeChangeMinDiff } from '../constants/general'
import { WINDOW_RESIZE } from '../constants/actionTypes'

const windowResizeHandler = (event, reduxStore) => {
  const windowState = reduxStore.getState().window
  const dispatch = reduxStore.dispatch
  
  const newWidth = event.target.innerWidth
  const newHeight = event.target.innerHeight
  const oldWidth = windowState.width
  const oldHeight = windowState.height
  
  const diffWidth = Math.abs(newWidth - oldWidth)
  const diffHeight = Math.abs(newHeight - oldHeight)
  const windowSizeChangeDiff = Math.max(diffWidth, diffHeight)
  
  // Only dispatch action if change is more than a specific amount,
  // to avoid too many window resize actions
  if (windowSizeChangeMinDiff <= windowSizeChangeDiff)
    dispatch(getActionObject(WINDOW_RESIZE, {width:newWidth, height:newHeight}))
}

export default windowResizeHandler
