import { connect } from 'react-redux'

import TakeTest from './TakeTest'

import * as cts from '../constants'


const mapStateToProps = (state, ownProps) => ({
  targetCents: state.test.targetCents,
  playbackSpeedPicklist: state.setup[cts.PLAYBACK_SPEED],
  utonalDisplayCheckbox: state.setup[cts.UTONAL_DISPLAY],
  questions: state.test.questions,
  chordData: state.test.chordData
})

const mapDispatchToProps = (dispatch, ownProps) => ({
})

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(TakeTest)
 
