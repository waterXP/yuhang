import { connect } from 'react-redux'
import Confirm from './Confirm'

import { checkCode } from '../modules/login'
import { toast } from '@/store/root'

const mapStateToProps = (state) => ({
  account: state.login.account,
  query: state.location.query,
  isBusy: state.root.isBusy
})
const mapDispatchToProps = {
  checkCode,
  toast
}

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(Confirm)
