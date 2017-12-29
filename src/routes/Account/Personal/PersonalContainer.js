import { connect } from 'react-redux'
import Personal from './Personal'

const mapStateToProps = (state) => ({
  isBusy: state.root.isBusy
})
const mapDispatchToProps = {
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Personal)
