import React, { Component } from 'react'
import PropTypes from 'prop-types'

class ReceiptButtons extends Component {
  render () {
    const { btns } = this.props
    return (
      <div className='wm-receipt-buttons'>
        {
          btns.map((v, i) =>
            <a 
              href='javascript:;'
              onClick={v.func}
              key={i}
            >
              { v.text }
            </a>
          )
        }
      </div>
    )
  }
}

ReceiptButtons.propTypes = {
  btns: PropTypes.array.isRequired
}

export default ReceiptButtons
