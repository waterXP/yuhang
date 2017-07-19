import React, { Component } from 'react'
import PropTypes from 'prop-types'
import './Filter.scss'

class Filter extends Component {
  static propTypes = {
    conditions: PropTypes.array,
    title: PropTypes.string,
    clickHandler: PropTypes.func
  }
  clickHandle (id) {
    const { clickHandler } = this.props
    if (clickHandler) {
      return () => clickHandler(id)
    }
  }
  render () {
    const { conditions, title } = this.props
    return (
      <div className='wm-filter'>
        {
          title && <p className='topic'>
            <span className='fa fa-circle' />
            &nbsp;{ title }
          </p>
        }
        {
          conditions.map((v) => {
            return (
              <button
                key={v.id}
                type='button'
                className={`btn${v.sel ? ' active' : ''}`}
                onClick={this.clickHandle(v.id)}
              >
                { v.text }
              </button>
            )
          })
        }
      </div>
    )
  }
}

export default Filter
