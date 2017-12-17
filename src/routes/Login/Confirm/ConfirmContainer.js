import { connect } from 'react-redux'
import Confirm from './Confirm'

const mapStateToProps = (state) => ({
  account: state.login.account,
  query: state.location.query
})
const mapDispatchToProps = {
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Confirm)
