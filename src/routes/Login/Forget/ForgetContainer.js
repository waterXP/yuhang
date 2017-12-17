import { connect } from 'react-redux'
import Forget from './Forget'

import { setForgetAccount } from '../modules/login'

const mapStateToProps = (state) => ({
})
const mapDispatchToProps = {
  setForgetAccount
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Forget)
