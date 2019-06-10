import { initialisePicklistFromId } from '../setup/setupReduxState'
import * as cts from '../constants'


const picklist = id => (state = initialisePicklistFromId(id), action, topState) => {
  if (state.id !== action.id) return state
  switch (action.type) {
    case cts.SET_PICKLIST:
      return {
        ...state,
        value: action.value
      }
    default:
      return state
  }
}

export default picklist
