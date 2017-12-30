import { connect } from 'react-redux'
import Register from './Register'

import { register, getValidate } from '../modules/login'
import { toast } from '@/store/root'

const mapStateToProps = (state) => ({
  wrongValidate: state.login.wrongValidate,
  isBusy: state.root.isBusy
})
const mapDispatchToProps = {
  register,
  getValidate,
  toast
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Register)
