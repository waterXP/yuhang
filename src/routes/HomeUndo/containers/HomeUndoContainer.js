import { connect } from 'react-redux'
import {getUndo,initialUndo,deleteExp} from '../modules/HomeUndo'

import HomeUndo from '../components/HomeUndo'

const mapStateToProps = (state) => ({
  undo:state.home.undo
})

const mapDispatchToProps = {
  getUndo,
  initialUndo,
  deleteExp
}

export default connect(mapStateToProps, mapDispatchToProps)(HomeUndo)