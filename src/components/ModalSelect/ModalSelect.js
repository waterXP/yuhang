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
    return (
      <div className='wm-modal-select'>
        <div className='container'>
          <button className='btn btn-xs' onClick={close}>
            x
          </button>
          <ul>
            {
              options.map((v, i) => {
                const _id = labelId ? v[labelId] : v
                const _name = labelName ? v[labelName] : v
                return (
                  <li
                    key={_id}
                    onClick={
                      active !== i && this.clickHandle(i, scope, _id)
                    }
                    className={`${active === i ? 'active' : ''}`}
                  >
                    { _name }
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
