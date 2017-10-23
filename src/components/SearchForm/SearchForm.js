import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { Link } from 'react-router'
import './SearchForm.scss'

class SearchForm extends Component {
  static propTypes = {
    inBusy: PropTypes.func,
    submitHandler: PropTypes.func,
    cancelHandler: PropTypes.func,
    placeholder: PropTypes.string,
    hiddenButton: PropTypes.bool
  }
  constructor (props) {
    super(props)
    this.state = {
      tm: null,
      dirty: false
    }
    this.handleChange = this::this.handleChange
    this.clean = this::this.clean
    this.getList = this::this.getList
    this.handleCancel = this::this.handleCancel
  }
  handleChange (e) {
    const { inBusy } = this.props
    const v = e.target.value
    this.setState({ dirty: !!v })
    this.getList(v, v === '')
  }
  clean () {
    const { inBusy } = this.props
    this.refs.searchInput.value = ''
    this.getList('', true)
    this.setState({ dirty: false })
  }
  getList (v, immediately) {
    const { tm } = this.state
    const { inBusy, submitHandler } = this.props
    if (tm) {
      clearTimeout(tm)
    }
    if (immediately) {
      inBusy(false)
      submitHandler(v)
      this.setState({
        tm: 0
      })
    } else {
      const target = setTimeout(() => {
        submitHandler(v)
        inBusy(false)
      }, 1000)
      this.setState({ tm: target })
      if (v) {
        inBusy(true)
      } else {
        inBusy(false)
      }
    }
  }
  handleCancel () {
    this.clean()
    this.props.cancelHandler()
  }
  render () {
    const { placeholder, cancelHandler, hiddenButton } = this.props
    const { dirty } = this.state
    return (
      <div className='wm-search-form'>
        <i className='fa fa-search' htmlFor='search' />
        <input
          type='text'
          id='search'
          ref='searchInput'
          placeholder={placeholder}
          onChange={this.handleChange}
        />
        { dirty && <i className='fa fa-times-circle' onClick={this.clean} /> }
        { (!hiddenButton || dirty) && <a onClick={this.handleCancel}>取消</a> }
      </div>
    )
  }
}

export default SearchForm
