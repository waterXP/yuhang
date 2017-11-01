import { connect } from 'react-redux'

import SettingsEditAccount from '../components/SettingsEditAccount'

const mapStateToProps = (state) => ({
  query: state.location.query
})

const mapDispatchToProps = {
}

export default connect(mapStateToProps, mapDispatchToProps)(SettingsEditAccount)

