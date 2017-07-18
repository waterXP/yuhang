import { connect } from 'react-redux'
import { getUndo, initialUndo, deleteExp,
  isLoading, loadMore } from '../modules/HomeUndo'

import HomeUndo from '../components/HomeUndo'

const mapStateToProps = (state) => ({
  undo:state.home.undo,
  noMore:state.home.undo,
  loading:state.home.isLoading,
  loadMoreBool:state.home.loadMore
})

const mapDispatchToProps = {
  getUndo,
  initialUndo,
  deleteExp,
  isLoading,
  loadMore
}

export default connect(mapStateToProps, mapDispatchToProps)(HomeUndo)
