import { connect } from 'react-redux'

import MarkTest from './MarkTest'

import { getSummary } from '../picklists'


const mapStateToProps = (state, ownProps) => ({
  setupSummary: getSummary(state.setup)
})

const mapDispatchToProps = (dispatch, ownProps) => ({
})

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(MarkTest)
 
