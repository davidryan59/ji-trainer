import { connect } from 'react-redux'

import Test from './Test'

const mapStateToProps = (state, ownProps) => ({
  setup: state.test.setup,
  results: state.test.results,
  questions: state.test.questions
})

const mapDispatchToProps = (dispatch, ownProps) => ({
})

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Test)
 
