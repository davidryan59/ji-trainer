import { connect } from 'react-redux'

import Button from './Button'
import { getThunk } from '../actions'
import { BUTTON_PRESS } from '../constants/actionTypes'

const mapStateToProps = (state, ownProps) => ({
})

const mapDispatchToProps = (dispatch, ownProps) => ({
  onClick: e => dispatch(getThunk(BUTTON_PRESS, {id: ownProps.id, ...ownProps.data}))
})

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Button)
 
