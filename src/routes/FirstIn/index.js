import React, { Component } from 'react'
import { goLocation } from '@/lib/base'

class FirstIn extends Component {
  componentWillMount () {
    goLocation('/home')
  }
  render () {
    return (
      <div />
    )
  }
}

export default { component: FirstIn }
