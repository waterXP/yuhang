import { connect } from 'react-redux'
// import { exampleNormal, exampleAsync, exampleFetch } from '../modules/NewPersonalExpense'

import NewPersonalExpense from '../components/NewPersonalExpense'

const mapStateToProps = (state) => ({
  // NewPersonalExpense : state.NewPersonalExpense
})

const mapDispatchToProps = {
  // exampleNormal,
  // exampleAsync,
  // exampleFetch
}

export default connect(mapStateToProps, mapDispatchToProps)(NewPersonalExpense)

