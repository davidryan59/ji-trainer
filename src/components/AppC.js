import { connect } from 'react-redux'

import App from './App'


const mapStateToProps = (state, ownProps) => ({
  mode: state.mode
})

const mapDispatchToProps = (dispatch, ownProps) => ({
})

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(App)
 
