import { connect } from 'react-redux'
import Complete from './Complete'

const mapStateToProps = (state) => ({
  query: state.location.query
})
const mapDispatchToProps = {
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Complete)
