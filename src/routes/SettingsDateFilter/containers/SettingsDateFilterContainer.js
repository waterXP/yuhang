import { connect } from 'react-redux'
// import { exampleNormal, exampleAsync, exampleFetch } from '../modules/SettingsDateFilter'

import SettingsDateFilter from '../components/SettingsDateFilter'

const mapStateToProps = (state) => ({
  // SettingsDateFilter : state.SettingsDateFilter
})

const mapDispatchToProps = {
  // exampleNormal,
  // exampleAsync,
  // exampleFetch
}

export default connect(mapStateToProps, mapDispatchToProps)(SettingsDateFilter)

