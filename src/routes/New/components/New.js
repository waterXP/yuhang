import React, { Component } from 'react'
import PropTypes from 'prop-types'
import ExpenseForm from '@/components/ExpenseForm'
import './New.scss'
import { dingSetTitle, dingSetNavRight } from '@/lib/ddApi'

class New extends Component {
  static propTypes = {
    children: PropTypes.element
  }
  constructor () {
    super(...arguments)
    this.setPos = this::this.setPos
  }
  componentDidUpdate () {
    const { children } = this.props
    if (!children) {
      dingSetTitle('个人报销')
      dingSetNavRight('')
    }
  }
  setPos (v) {
    this.newRef.scrollTop = v
  }
  render () {
    const { children } = this.props
    return (
      <div
        className='wm-new wm-new-personal-expense'
        ref={el => this.newRef = el}
      >
        { children || <ExpenseForm setPos={this.setPos} /> }
      </div>
    )
  }
}

export default New
