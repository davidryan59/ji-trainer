import { connect } from 'react-redux'

import Test from './Test'

const mapStateToProps = (state, ownProps) => ({
  controls: state.test.controls,
  questions: state.test.questions
})

const mapDispatchToProps = (dispatch, ownProps) => ({
})

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Test)
 
