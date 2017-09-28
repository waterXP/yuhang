import { connect } from 'react-redux'
import { addComment } from '@/routes/HomeApproveDetail/modules/HomeApproveDetail'

import HomeComment from '../components/HomeComment'

const mapStateToProps = (state) => ({
  approvalDetail: state.home.detail,
  query: state.location.query,
  isBusy: state.home.isBusy
})

const mapDispatchToProps = {
  addComment
}

export default connect(mapStateToProps, mapDispatchToProps)(HomeComment)
