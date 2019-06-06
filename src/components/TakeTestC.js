import { connect } from 'react-redux'

import TakeTest from './TakeTest'

import { PLAYBACK_SPEED } from '../constants'


const mapStateToProps = (state, ownProps) => ({
  playbackSpeedPicklist: state.setup[PLAYBACK_SPEED],
  questions: state.test.questions
})

const mapDispatchToProps = (dispatch, ownProps) => ({
})

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(TakeTest)
 
