import { connect } from 'react-redux'

import SetupTest from './SetupTest'

import { NOTES_IN_CHORD } from '../constants'

import { getSummary } from '../controls'


const mapStateToProps = (state, ownProps) => ({
  notesInChordPicklist: state.setup[NOTES_IN_CHORD],
  setupSummary: getSummary(state.setup)
})

const mapDispatchToProps = (dispatch, ownProps) => ({
})

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(SetupTest)
 
