import { connect } from 'react-redux'
// import { exampleNormal, exampleAsync, exampleFetch } from '../modules/ApprovalSearch'

import ApprovalSearch from '../components/ApprovalSearch'

const mapStateToProps = (state) => ({
  // ApprovalSearch : state.ApprovalSearch
})

const mapDispatchToProps = {
  // exampleNormal,
  // exampleAsync,
  // exampleFetch
}

export default connect(mapStateToProps, mapDispatchToProps)(ApprovalSearch)

