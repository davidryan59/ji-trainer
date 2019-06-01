import { WINDOW_RESIZE } from '../constants/actionTypes'
import { getInitialWindowState } from '../setup/setupReduxState'

const windowReducer = (state = getInitialWindowState(), action) => {
  switch (action.type) {
    case WINDOW_RESIZE:
      return {
        width: action.width,
        height: action.height
      }
    default:
      return state
  }
}

export default windowReducer
