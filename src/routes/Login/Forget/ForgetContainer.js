import { connect } from 'react-redux'
import Forget from './Forget'

import { setForgetAccount } from '../modules/login'

const mapStateToProps = (state) => ({
  isBusy: state.root.isBusy
})
const mapDispatchToProps = {
  setForgetAccount
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Forget)
