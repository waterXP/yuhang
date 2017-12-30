import { connect } from 'react-redux'
import Personal from './Personal'

import { getList, clearList } from '@/store/root'
import { audit } from '../modules/account'

const mapStateToProps = (state) => {
  const { isBusy, list, page, pageSize, total } = state.root
  return {
    isBusy, list, page, pageSize, total
  }
}
const mapDispatchToProps = {
  getList, clearList, audit
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Personal)
