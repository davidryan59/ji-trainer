import { connect } from 'react-redux'

import TakeTest from './TakeTest'

import { PLAYBACK_SPEED } from '../constants'


const mapStateToProps = (state, ownProps) => ({
  targetCents: state.test.targetCents,
  playbackSpeedPicklist: state.setup[PLAYBACK_SPEED],
  questions: state.test.questions,
  chordData: state.test.chordData
})

const mapDispatchToProps = (dispatch, ownProps) => ({
})

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(TakeTest)
 
