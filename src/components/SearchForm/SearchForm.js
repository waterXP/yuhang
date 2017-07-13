import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { Link } from 'react-router'
import './SearchForm.scss'

class SearchForm extends Component {
  constructor (props) {
    super(props)
    this.state = {
      tm: null
    }
  }
  handleChange (e) {
    const { tm, loading } = this.state
    const { inBusy, submitHandler } = this.props
    let v = e.target.value
    if (tm) {
      clearTimeout(tm)
    }
    const target = setTimeout (() => {
      submitHandler(v)
      inBusy(false)
    }, 1000)
    this.setState({
      tm: target
    })
    if (v) {
      inBusy(true)
    } else {
      inBusy(false)
    }
  }
  render () {
    const { btnLink } = this.props
    const { loading } = this.state
    const dirty = true
    return (
      <div className='wm-search-form'>
        <i className='fa fa-search' htmlFor='search' />
        <input
          type='text'
          id='search'
          placeholder='单号、备注、制单人、报销人'
          className={ `${!dirty && 'dirty'}` }
          onChange={ this.handleChange.bind(this) }
        />
        { dirty && <i className='fa fa-times-circle' /> }
        <Link to={ btnLink }>取消</Link>
      </div>
    )
  }
}

export default SearchForm
