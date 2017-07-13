import React, { Component } from 'react'
import PropTypes from 'prop-types'
import './ModalSelect.scss'

class ModalSelect extends Component {
  render () {
    const { options, active, labelId, labelValue, close, select } = this.props
    let _id = labelId || 'id'
    let _value = labelValue || 'value'

    return (
      <div className='wm-modal-select'>
        <div className='container'>
          <button className='btn btn-xs' onClick={ close }><i className='fa fa-times' /></button>
          <ul>
            {
              options.map((v) => {
                return (
                  <li key={ v[_id] } onClick={ active !== v[_id] && select.bind(this, v[_id]) } className={ `${active === v[_id] ? 'active' : ''}` }>{ v[_value] }</li>
                )
              })
            }
          </ul>
        </div>
      </div>
    )
  }
}

export default ModalSelect
