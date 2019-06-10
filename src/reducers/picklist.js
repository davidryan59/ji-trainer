import { SET_PICKLIST } from '../constants'

import { initialisePicklistFromId } from '../setup/setupReduxState'


const picklist = id => (state = initialisePicklistFromId(id), action, topState) => {
  if (state.id !== action.id) return state
  switch (action.type) {
    case SET_PICKLIST:
      return {
        ...state,
        value: action.value
      }
    default:
      return state
  }
}

export default picklist
