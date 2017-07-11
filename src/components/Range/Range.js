import React, { Component } from 'react'
import PropTypes from 'prop-types'
import './Range.scss'

class Range extends Component {
  handleBlur (e) {
    let m = +e.target.value
    if (isNaN(m)) {
      e.target.value = ''
      return
    }
    let { dec, updateRange } = this.props
    if (!dec) {
      dec = 2
    }
    const str = '' + m
    let [integer, decimal] = str.split('.')
    if (decimal) {
      decimal = decimal.substr(0, dec)
    } else {
      decimal = ''
    }
    while (decimal.length < dec) {
      decimal += '0'
    }
    e.target.value = `${integer}.${decimal}`
    if (updateRange) {
      updateRange([this.min.value, this.max.value])
    }
  }
  render () {
    const { title, range } = this.props
    const [start, end] = range
    return (
      <div className='wm-range'>
        { title && <p className='topic'>
          <span className='fa fa-circle' />
          &nbsp;输入金额区间
        </p> }
        <input
          type='text'
          placeholder={ start.holder }
          onBlur={ this.handleBlur.bind(this) }
          ref={ (e) => { this.min = e } }
        />
        <span>-</span>
        <input
          type='text'
          placeholder={ end.holder }
          onBlur={ this.handleBlur.bind(this) }
          ref={ (e) => { this.max = e } }
        />
      </div>
    )
  }
}

export default Range
