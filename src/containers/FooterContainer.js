import { connect } from 'react-redux'
import Footer from '@/components/Footer'

const mapStateToProps = (state) => ({
  ...state.footer,
  pathname: state.location.pathname
})

export default connect(mapStateToProps)(Footer)
