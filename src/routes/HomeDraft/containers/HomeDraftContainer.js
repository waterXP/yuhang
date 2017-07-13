import { connect } from 'react-redux'
import {getDraft,initialDraft,deleteExp} from '../modules/HomeDraft'

import HomeDraft from '../components/HomeDraft'

const mapStateToProps = (state) => ({
  draft:state.home.draft,
})

const mapDispatchToProps = {
  getDraft,
  initialDraft,
  deleteExp
}

export default connect(mapStateToProps, mapDispatchToProps)(HomeDraft)