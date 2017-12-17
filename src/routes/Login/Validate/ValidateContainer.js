import { connect } from 'react-redux'
import Validate from './Validate'

import { getValidate, setValidate } from '../modules/login'

const mapStateToProps = (state) => ({
  account: state.login.account
})
const mapDispatchToProps = {
  getValidate,
  setValidate
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Validate)
