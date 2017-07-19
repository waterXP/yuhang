import { connect } from 'react-redux'
import Home from '../components/Home'
import { initialApprove } from '../../HomeList/modules/HomeList'

const mapStateToProps = (state) => ({
})

const mapDispatchToProps={
  initialApprove
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Home)
