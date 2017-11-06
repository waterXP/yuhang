import React, { Component } from 'react'
import PropTypes from 'prop-types'
import './Range.scss'
import { getNumber } from '@/lib/base'

class Range extends Component {
  static propTypes = {
    updateRange: PropTypes.func,
    title: PropTypes.string,
    range: PropTypes.array,
    placeholder: PropTypes.array,
    autoFocus: PropTypes.bool
  }
  constructor (props) {
    super(props)
    this.handleFocus = this.handleFocus.bind(this)
    this.handleBlur = this.handleBlur.bind(this)
  }
  componentDidMount () {
    this.props.autoFocus && this.min.focus()
  }
  handleFocus (e) {
    e.target.select()
  }
  handleBlur (e) {
    let m = e.target.value === '' ? '' : +e.target.value
    if (isNaN(m)) {
      e.target.value = ''
    }
    let { updateRange } = this.props
    if (m) {
      e.target.value = getNumber(m, 2)
    }
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
    let startHolder = ''
    let endHolder = ''
    if (placeholder) {
      [startHolder, endHolder] = placeholder
    }
    return (
      <div className='wm-range'>
        { title && <p className='topic'>{ title }</p> }
        <div className='filter-area'>
          <input
            type='tel'
            placeholder={startHolder}
            onFocus={this.handleFocus}
            onBlur={this.handleBlur}
            defaultValue={start}
            ref={(e) => { this.min = e }}
          />
          <div className='divide' />
          <input
            type='tel'
            placeholder={endHolder}
            onFocus={this.handleFocus}
            onBlur={this.handleBlur}
            defaultValue={end}
            ref={(e) => { this.max = e }}
          />
        </div>
      </div>
    )
  }
}

export default Range
