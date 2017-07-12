import { connect } from 'react-redux'

import Approval from '../components/Approval'

const mapStateToProps = (state) => ({
  location: state.location
})

const mapDispatchToProps = {}

export default connect(mapStateToProps, mapDispatchToProps)(Approval)

