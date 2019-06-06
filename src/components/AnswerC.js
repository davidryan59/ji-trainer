import { connect } from 'react-redux'

import Answer from './Answer'

import { getSummary } from '../controls'


const mapStateToProps = (state, ownProps) => ({
  setupSummary: getSummary(state.setup),
})

const mapDispatchToProps = (dispatch, ownProps) => ({
})

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Answer)
 
