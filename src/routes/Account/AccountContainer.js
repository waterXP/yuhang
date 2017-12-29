import { connect } from 'react-redux'
import Account from './Account'

import { toast } from '@/store/root'

const mapStateToProps = (state) => ({
  isBusy: state.root.isBusy,
  pathname: state.location.pathname
})
const mapDispatchToProps = {
  toast
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Account)
