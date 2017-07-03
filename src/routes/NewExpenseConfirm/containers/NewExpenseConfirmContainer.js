import { connect } from 'react-redux'
// import { exampleNormal, exampleAsync, exampleFetch } from '../modules/newExpenseConfirm'

import NewExpenseConfirm from '../components/NewExpenseConfirm'

const mapStateToProps = (state) => ({
  // newExpenseConfirm : state.newExpenseConfirm
})

const mapDispatchToProps = {
  // exampleNormal,
  // exampleAsync,
  // exampleFetch
}

export default connect(mapStateToProps, mapDispatchToProps)(NewExpenseConfirm)

