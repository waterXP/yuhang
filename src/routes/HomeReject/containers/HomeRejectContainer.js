import { connect } from 'react-redux'
// import { getConfig } from '../../../store/root'
import {getReject,initialReject} from '../modules/HomeReject'
import HomeReject from '../components/HomeReject'

const mapStateToProps = (state) => ({
  reject:state.home.reject,
})

const mapDispatchToProps = {
  getReject,
  initialReject
}

export default connect(mapStateToProps, mapDispatchToProps)(HomeReject)