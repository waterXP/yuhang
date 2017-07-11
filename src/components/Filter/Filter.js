import React, { Component } from 'react'
import PropTypes from 'prop-types'
import './Filter.scss'

class Filter extends Component {
  render () {
    const { conditions, title, multiple, clickHandler } = this.props
    return (
      <div className='wm-filter'>
        { title && <p className='topic'>
          <span className='fa fa-circle' />
          &nbsp;选择筛选条件
        </p> }
        { conditions.map((v) => {
          return (
            <button key={ v.id } type='button' className={ `btn${v.sel ? ' active' : ''}` } onClick={ clickHandler.bind(this, v.id) }>
              { v.text }
            </button>
          )
        }) }
      </div>
    )
  }
}

export default Filter
