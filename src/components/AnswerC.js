import { connect } from 'react-redux'

import Answer from './Answer'

import { displayChordArrayRatios, chordArrayToCents } from '../chords'
import { getSummary } from '../controls'


const mapStateToProps = (state, ownProps) => {
  const [displayRatios, isUtonal] = displayChordArrayRatios(ownProps.answer.chord)
  return {
    displayRatios,
    isUtonal,
    displayCents: chordArrayToCents(ownProps.answer.chord),
    setupSummary: getSummary(state.setup),
  }  
}

const mapDispatchToProps = (dispatch, ownProps) => ({
})

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Answer)
 
