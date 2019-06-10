export const combineReducersWithOuterState = innerReducers => (state={}, action, outerState) => {
  const nextOuterState = outerState || state
  const nextState = {}
  const entries = Object.entries(innerReducers)
  entries.forEach( ([label, reducer]) => nextState[label] = reducer(state[label], action, nextOuterState))
  const hasChanged = entries.reduce(
    (acc, [label, reducer]) => acc || nextState[label] !== state[label]
  , false)
  return hasChanged ? nextState : state
}
