import { connect } from 'react-redux'
import Register from './Register'

import { register, getValidate } from '../modules/login'

const mapStateToProps = (state) => ({
  wrongValidate: state.login.wrongValidate
})
const mapDispatchToProps = {
  register,
  getValidate
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Register)
