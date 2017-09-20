import React, { Component } from 'react'
import PropTypes from 'prop-types'
import RowButton from './RowButton'
import './RowButtons.scss'

class RowButtons extends Component {
  static propTypes = {
    btns: PropTypes.array.isRequired,
    clickHanlder: PropTypes.func
  }
  render () {
    const { btns, clickHandler } = this.props
    return (
      <div className='wm-row-buttons'>
        {
          btns.map((v, i) => {
            return (
              <RowButton
                clickHandler={clickHandler}
                key={v.value || i}
                {...v}
              />
            )
          })
        }
      </div>
    )
  }
}

export default RowButtons
