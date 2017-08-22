import React, { Component } from 'react'
import PropTypes from 'prop-types'
import './InputSearch.scss'

class InputSearch extends Component {
  static propTypes = {
    handleChange: PropTypes.func
  }
  constructor () {
    super(...arguments)
    this.handleChange = this::this.handleChange
    this.state = {
      tm: 0
    }
  }
  handleChange (e) {
    let v = e.target.value
    const { tm } = this.state
    const { handleChange } = this.props
    if (tm > 0) {
      clearTimeout(tm)
    }
    let newTm = setTimeout(() =>
      handleChange(v)
    , 500)
    this.setState({
      tm: newTm
    })
  }
  render () {
    return (
      <div className='wm-input-search'>
        <input
          type='text'
          placeholder='搜索'
          onChange={this.handleChange}
        />
      </div>
    )
  }
}

export default InputSearch
