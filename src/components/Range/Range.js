import React, { Component } from 'react'
import PropTypes from 'prop-types'
import './Range.scss'
import { getNumber } from '@/lib/base'

class Range extends Component {
  handleFocus (e) {
    e.target.select()
  }
  handleBlur (e) {
    if (e.target.value === '') {
      return
    }
    let m = +e.target.value
    if (isNaN(m)) {
      e.target.value = ''
      return
    }
    let { dec, updateRange } = this.props
    e.target.value = getNumber(m)
    if (this.min.value && this.max.value && +this.min.value > +this.max.value) {
      if (e.target === this.min) {
        e.target.value = this.max.value
      } else {
        e.target.value = this.min.value
      }
    }
    if (updateRange) {
      updateRange([this.min.value, this.max.value])
    }
  }
  render () {
    const { title, range, placeholder } = this.props
    const [start, end] = range
    let startHolder = '', endHolder = ''
    if (placeholder) {
      [startHolder, endHolder] = placeholder
    }
    return (
      <div className='wm-range'>
        { title && <p className='topic'>
          <span className='fa fa-circle' />
          &nbsp;{ title }
        </p> }
        <input
          type='text'
          placeholder={ startHolder }
          onFocus={ this.handleFocus.bind(this) }
          onBlur={ this.handleBlur.bind(this) }
          defaultValue={ start }
          ref={ (e) => { this.min = e } }
        />
        <span>-</span>
        <input
          type='text'
          placeholder={ endHolder }
          onFocus={ this.handleFocus.bind(this) }
          onBlur={ this.handleBlur.bind(this) }
          defaultValue={ end }
          ref={ (e) => { this.max = e } }
        />
      </div>
    )
  }
}

export default Range
