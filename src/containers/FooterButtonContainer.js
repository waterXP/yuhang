import { connect } from 'react-redux'
import FooterButton from '@/components/FooterButton'

const mapStateToProps = (state) => ({
  pathname: state.location.pathname
})

export default connect(mapStateToProps)(FooterButton)
