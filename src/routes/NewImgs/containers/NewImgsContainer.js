import { connect } from 'react-redux'
import NewImgs from '../components/NewImgs'
import { removeAttachment } from '../../New/modules/new'

const mapStateToProps = (state) => {
  const { data } = state.new
  return {
    query: state.location.query,
    attachmentList: state.new.data ? state.new.data.attachmentList : [],
    restAttachments: state.new.data ? state.new.data.restAttachments : []
  }
}

const mapDispatchToProps = {
  removeAttachment
}

export default connect(mapStateToProps, mapDispatchToProps)(NewImgs)
