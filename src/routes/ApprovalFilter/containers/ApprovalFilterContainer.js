import { connect } from 'react-redux'
// import { exampleNormal, exampleAsync, exampleFetch } from '../modules/ApprovalFilter'

import ApprovalFilter from '../components/ApprovalFilter'

const mapStateToProps = (state) => ({
  // ApprovalFilter : state.ApprovalFilter
})

const mapDispatchToProps = {
  // exampleNormal,
  // exampleAsync,
  // exampleFetch
}

export default connect(mapStateToProps, mapDispatchToProps)(ApprovalFilter)

