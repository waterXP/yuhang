import { connect } from 'react-redux'
import Validate from './Validate'

import { getValidate, setValidate } from '../modules/login'
import { toast } from '@/store/root'

const mapStateToProps = (state) => ({
  account: state.login.account,
  isBusy: state.root.isBusy
})
const mapDispatchToProps = {
  getValidate,
  setValidate,
  toast
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Validate)
