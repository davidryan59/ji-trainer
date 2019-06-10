import { connect } from 'react-redux'

import SetupTest from './SetupTest'
import * as cts from '../constants'
import { getControlsSummary } from '../controls'
import { validateChordData } from '../models/chord'


const mapStateToProps = (state, ownProps) => {
  const [canStartTest, validationMessage] = validateChordData(state.test.chordData)
  const controlsSummary = getControlsSummary(state.setup)
  return {
    notesInChordPicklist: state.setup[cts.NOTES_IN_CHORD],
    maxComplexityPicklist: state.setup[cts.MAX_COMPLEXITY],
    minIntervalPicklist: state.setup[cts.MIN_INTERVAL],
    maxIntervalPicklist: state.setup[cts.MAX_INTERVAL],
    minChordIntervalPicklist: state.setup[cts.MIN_CHORD_INTERVAL],
    maxChordIntervalPicklist: state.setup[cts.MAX_CHORD_INTERVAL],
    controlsSummary,
    canStartTest,
    validationMessage
  }
}

const mapDispatchToProps = (dispatch, ownProps) => ({
})

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(SetupTest)
 
