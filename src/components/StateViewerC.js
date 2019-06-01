import { connect } from 'react-redux'

import StateViewer from './StateViewer'

const whitespaceChars = 0    // Select 0 or 1. HTML won't display more than 1.

const mapStateToProps = (state, ownProps) => ({
  actionJSON: JSON.stringify(state.lastAction, null, whitespaceChars),
  stateJSON: JSON.stringify(state, null, whitespaceChars)
})

const mapDispatchToProps = (dispatch, ownProps) => ({
})

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(StateViewer)
