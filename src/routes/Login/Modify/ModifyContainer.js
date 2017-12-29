import { connect } from 'react-redux'
import Modify from './Modify'

import { setNewPassword } from '../modules/login'

const mapStateToProps = (state) => ({
  account: state.login.account,
  isBusy: state.root.isBusy
})
const mapDispatchToProps = {
  setNewPassword
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Modify)
