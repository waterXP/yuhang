import React, { Component } from 'react'
import PropTypes from 'prop-types'
import './Cover.scss'

class Cover extends Component {
  render () {
    const covers = [{
      icon: 'qrcode',
      text: '报销单号'
    }, {
      icon: 'user',
      text: '制单人'
    }, {
      icon: 'user-circle',
      text: '报销人'
    }, {
      icon: 'commenting',
      text: '备注'
    }]
    return (
      <div className='wm-cover'>
        { covers.map((v, i) => {
          return (
            <div key={ i }>
              <i className={`fa fa-${v.icon}`} />
              <p>{ v.text }</p>
            </div>
          )
        }) }
      </div>
    )
  }
}

export default Cover
