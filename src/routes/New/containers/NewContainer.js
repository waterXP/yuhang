import { connect } from 'react-redux'
// import { exampleNormal, exampleAsync, exampleFetch } from '../modules/new'
import { getAlipaySwitch } from '../../../store/root'
import New from '../components/New'

const mapStateToProps = (state) => ({
  // new : state.new
  alipaySwitch: state.root.alipaySwitch
})

const mapDispatchToProps = {
  // exampleNormal,
  // exampleAsync,
  // exampleFetch
  getAlipaySwitch
}

export default connect(mapStateToProps, mapDispatchToProps)(New)

