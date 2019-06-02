import { connect } from 'react-redux'

import Question from './Question'

const mapStateToProps = (state, ownProps) => ({
  canPlay: !state.test.playing
})

const mapDispatchToProps = (dispatch, ownProps) => ({
})

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Question)
 
