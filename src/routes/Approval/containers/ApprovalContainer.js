import { connect } from 'react-redux'
// import { getConfig } from '../../../store/root'

import Approval from '../components/Approval'

const mapStateToProps = (state) => ({
  // approval : state.approval
})

const mapDispatchToProps = {
  // exampleNormal,
  // exampleAsync
}

export default connect(mapStateToProps, mapDispatchToProps)(Approval)

