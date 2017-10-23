import { connect } from 'react-redux'
import { setAppCatch } from '../../New/modules/new'
import NewType from '../components/NewType'

const mapStateToProps = (state) => ({
  step: state.new.step,
  costTypes: state.new.costTypes,
  appCatch: state.new.appCatch
})

const mapDispatchToProps = {
  setAppCatch
}

export default connect(mapStateToProps, mapDispatchToProps)(NewType)
