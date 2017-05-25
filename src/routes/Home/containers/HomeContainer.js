import { connect } from 'react-redux'
import { updateHeader } from '../../../store/header'
import Home from '../components/Home'

const mapDispatchToProps = {
  loader: () => updateHeader({
    title: '首页',
    btns: [{
      text: 'main',
      onClick: () => { console.log('main') }
    }]
  })
}

export default connect(undefined, mapDispatchToProps)(Home)
