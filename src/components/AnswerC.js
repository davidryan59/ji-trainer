import { connect } from 'react-redux'

import Answer from './Answer'

import { complexity, otonality, utonality, displayChordArrayRatios, chordArrayToCents } from '../chords'
import { getSummary } from '../controls'
import { toIntegerPercentText } from '../maths'


const mapStateToProps = (state, ownProps) => {
  const [displayRatios, isUtonal] = displayChordArrayRatios(ownProps.answer.chord)
  return {
    displayRatios,
    isUtonal,
    noteCount: ownProps.answer.chord.length,
    displayCents: chordArrayToCents(ownProps.answer.chord),
    cy: complexity(ownProps.answer.chord),
    otc: toIntegerPercentText(otonality(ownProps.answer.chord)),
    utc: toIntegerPercentText(utonality(ownProps.answer.chord)),
    setupSummary: getSummary(state.setup),
  }  
}

const mapDispatchToProps = (dispatch, ownProps) => ({
})

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Answer)
 
