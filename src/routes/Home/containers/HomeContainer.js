import { connect } from 'react-redux'
import { getConfig } from '../../../store/root'
import Home from '../components/Home'

const mapStateToProps = (state) => ({
})

const mapDispatchToProps = {
  getConfig
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Home)
