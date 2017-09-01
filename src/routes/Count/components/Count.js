import React, { Component } from 'react'
import './Count.scss'
import { dingSetTitle, dingSetNavRight } from '@/lib/base'

import NoData from '@/components/NoData'

class Count extends Component {
  componentDidMount () {
    dingSetTitle('统计')
    dingSetNavRight('')
  }
  render () {
    return (
      <div className='wm-count'>
        <NoData text='开发中，请至PC端查看' />
      </div>

    )
  }
}

export default Count

