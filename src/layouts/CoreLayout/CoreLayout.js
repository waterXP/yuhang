import React, { Component } from 'react'
import PropTypes from 'prop-types'
import './CoreLayout.scss'
import '@/styles/core.scss'
import { goLocation } from '@/lib/base'

class CoreLayout extends Component {
  static propTypes = {
    children : PropTypes.element,
    location: PropTypes.object.isRequired
  }
  constructor () {
    super(...arguments)
  }
  componentWillMount () {
    if (!this.props.children) {
      goLocation('/home', true)
    }
  }
  componentDidUpdate () {
    if (!this.props.children) {
      goLocation('/home', true)
    }
  }
  render () {
    const { children } = this.props
    return (
      <div className='container text-center'>
        <div className='core-layout__viewpor'>
          { children }
        </div>
      </div>
    )
  }
}

export default CoreLayout
