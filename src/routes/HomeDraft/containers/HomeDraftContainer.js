import { connect } from 'react-redux'
import { getDraft, clearDraft, deleteExp, isLoading, loadMore } from '../modules/HomeDraft'

import HomeDraft from '../components/HomeDraft'

const mapStateToProps = (state) => {
  return {
    draft:state.home.draft,
    loading:state.home.isLoading,
    noMore:state.home.noMore,
    loadMoreBool:state.home.loadMore
  }
}

const mapDispatchToProps = {
  getDraft,
  clearDraft,
  deleteExp,
  isLoading,
  loadMore
}

export default connect(mapStateToProps, mapDispatchToProps)(HomeDraft)
