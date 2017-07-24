import React, { Component } from 'react'
import './Count.scss'
import { dingSetTitle } from '@/lib/base'

import NoData from '@/components/NoData'

class Count extends Component {
  componentDidMount () {
    dingSetTitle('统计')
  }
  render () {
    return (
      <div className='wm-count'>
        <NoData text='开发中，请移步PC端' />
      </div>

    )
  }
}

export default Count

