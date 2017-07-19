import React, { Component } from 'react'
import PropTypes from 'prop-types'
import './ModalSelect.scss'

class ModalSelect extends Component {
  static propTypes = {
    select: PropTypes.func,
    options: PropTypes.array,
    active: PropTypes.number,
    labelId: PropTypes.string,
    labelName: PropTypes.string,
    close: PropTypes.func,
    scope: PropTypes.string
  }
  clickHandle (index, scope, id) {
    return () => this.props.select(index, scope, id)
  }
  render () {
    const { options, active, labelId, labelName,
      close, scope } = this.props
    let _id = labelId || 'id'
    let _name = labelName || 'name'
    return (
      <div className='wm-modal-select'>
        <div className='container'>
          <button className='btn btn-xs' onClick={close}>
            <i className='fa fa-times' />
          </button>
          <ul>
            {
              options.map((v, i) => {
                return (
                  <li
                    key={v[_id]}
                    onClick={
                      active !== i && this.clickHandle(i, scope, v[_id])
                    }
                    className={`${active === i ? 'active' : ''}`}
                  >
                    { v[_name] }
                  </li>
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
