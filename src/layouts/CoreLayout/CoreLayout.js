import React, { Component } from 'react'
import PropTypes from 'prop-types'
import FooterContainer from '@/containers/FooterContainer'
import './CoreLayout.scss'
import '@/styles/core.scss'
import { hashHistory } from 'react-router'
import { toast } from '@/lib/ddApi'

// export const CoreLayout = (props) => {
//   const { children, location } = props
//   // console.log(children)
//   let footerClass = ''
//   if (location.pathname.indexOf('/new') === 0) {
//     footerClass = ' no-footer'
//   } else if (location.pathname.indexOf('/home/approve/detail') === 0 ||
//     location.pathname.indexOf('/home/history/detail') === 0 ||
//     location.pathname.indexOf('/approval/detail') === 0) {
//     footerClass = ' sm-footer'
//   }
//   return (
//     <div className='container text-center'>
//       <div className={`core-layout__viewport${footerClass}`}>
//         { children }
//       </div>
//       <FooterContainer />
//     </div>
//   )
// }

class CoreLayout extends Component {
  static propTypes = {
    children : PropTypes.element,
    location: PropTypes.object.isRequired
  }
  constructor () {
    super(...arguments)
    this.state = {
      noFooter: false
    }
  }
  componentDidMount () {
    if (!this.props.children) {
      hashHistory.replace('/home')
    }
    window.onresize = () => {

      // toast('why you need resize')
      const { clientHeight, clientWidth } = document.getElementById('root')
      // toast(el.height)
      // toast(e)
      // toast(clientHeight + ' dfdf ' + clientWidth)
      if (clientHeight < clientWidth) {
        this.setState({
          noFooter: true
        })
      } else {
        this.setState({
          noFooter: false
        })
      }
    }
  }
  componentDidUpdate () {
    if (!this.props.children) {
      hashHistory.replace('/home')
    }
  }
  render () {
    const { children, location } = this.props
    const { noFooter } = this.state
    const { pathname } = location
    let footerClass = ''
    if (pathname.indexOf('/new') === 0 ||
      (pathname.indexOf('/settings') === 0 &&
        pathname !== '/settings' &&
        pathname !== '/settings/')) {
      footerClass = ' no-footer'
    } else if (pathname.indexOf('/home/approve/detail') === 0 ||
      pathname.indexOf('/home/history/detail') === 0 ||
      pathname.indexOf('/approval/detail') === 0) {
      footerClass = ' no-footer'
    }
    if (noFooter) {
      footerClass = ' no-footer'
    }
    return (
      <div className='container text-center'>
        <div className={`core-layout__viewport${footerClass}`}>
          { children }
        </div>
        { !noFooter && <FooterContainer /> }
      </div>
    )
  }
}

// CoreLayout.propTypes = {
//   children : PropTypes.element,
//   location: PropTypes.object.isRequired
// }

export default CoreLayout
