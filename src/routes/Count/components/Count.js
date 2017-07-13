import React, { Component } from 'react'
import './Count.scss'

import NoData from '@/components/NoData'

class Count extends Component {
  render () {
    return (
      <div className='wm-count'>
        <NoData text='开发中，请移步PC端' />
      </div>

    )
  }
}

export default Count

