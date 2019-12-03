import { connect } from 'react-redux'

import Checkbox from '../components/Checkbox'
import { getThunk } from '../actions'
import { SET_CHECKBOX } from '../constants'


const mapStateToProps = (state, ownProps) => ({
})

const mapDispatchToProps = (dispatch, ownProps) => ({
  valueChange: e => dispatch(getThunk(SET_CHECKBOX, {
    id: ownProps.checkbox.id,
    value: e.target.checked, ...ownProps.checkbox.data
  }))
})

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Checkbox)
