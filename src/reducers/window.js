import { getInitialWindowState } from '../setup/setupReduxState'
import * as cts from '../constants'


const windowReducer = (state = getInitialWindowState(), action, topState) => {
  switch (action.type) {
    case cts.WINDOW_RESIZE:
      return {
        width: action.width,
        height: action.height
      }
    default:
      return state
  }
}

export default windowReducer
