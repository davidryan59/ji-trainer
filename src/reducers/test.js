import { BUTTON_PRESS, START_TEST } from '../constants/actionTypes'
import { getInitialTestState } from '../setup/setupReduxState'

const test = (state = getInitialTestState(), action) => {
  switch (action.type) {
    case BUTTON_PRESS:
      return (action.id === START_TEST) ? getInitialTestState() : state
    default:
      return state
  }
}

export default test
