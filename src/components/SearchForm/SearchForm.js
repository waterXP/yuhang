import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { Link } from 'react-router'
import './SearchForm.scss'

class SearchForm extends Component {
  static propTypes = {
    inBusy: PropTypes.func,
    submitHandler: PropTypes.func,
    btnLink: PropTypes.string,
    placeholder: PropTypes.string
  }
  constructor (props) {
    super(props)
    this.state = {
      tm: null,
      dirty: false
    }
    this.handleChange = this.handleChange.bind(this)
    this.clean = this.clean.bind(this)
    this.getList = this.getList.bind(this)
  }
  handleChange (e) {
    const v = e.target.value
    this.setState({ dirty: !!v })
    this.getList(v)
  }
  clean () {
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
  render () {
    const { btnLink, placeholder } = this.props
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
        <Link to={btnLink}>取消</Link>
      </div>
    )
  }
}

export default SearchForm
