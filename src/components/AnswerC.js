import { connect } from 'react-redux'

import Answer from './Answer'

import * as chd from '../models/chord'
import { getSummary } from '../controls'
import { toIntegerPercentText } from '../maths'


const mapStateToProps = (state, ownProps) => {
  const answer = ownProps.answer
  const chord = answer.chord
  const [displayRatios, isUtonal] = chd.displayChordArrayRatios(chord)
  const setupSummary = getSummary(state.setup)
  return {
    displayRatios,
    isUtonal,
    noteCount: chord.length,
    displayCents: chd.chordArrayToCents(chord),
    cy: chd.complexity(chord),
    otc: toIntegerPercentText(chd.otonality(chord)),
    utc: toIntegerPercentText(chd.utonality(chord)),
    setupSummary,
    data: {
      ...setupSummary,
      qNum:answer.qNum,
      aNum:answer.aNum
    }
  }  
}

const mapDispatchToProps = (dispatch, ownProps) => ({
})

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Answer)
 
