import { connect } from 'react-redux'

import Button from './Button'
import { getActionObject } from '../actions'
import { BUTTON_PRESS } from '../constants/actionTypes'

const mapStateToProps = (state, ownProps) => ({
})

const mapDispatchToProps = (dispatch, ownProps) => ({
  onClick: e => dispatch(getActionObject(BUTTON_PRESS, {id: ownProps.id}))
})

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Button)
 
