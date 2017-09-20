import React, { Component } from 'react'
import PropTypes from 'prop-types'

class ReceiptDelete extends Component {
  render () {
    let { names } = this.props
    let btnArray = []
    if (names) {
      names.map((cur, index) => {
        btnArray.push(
          <a href='javascript:;' onClick={cur.fun} key={index}>{cur.name}</a>
        )
      })
    }
    return (
      <div className='wm-receipt-delete'>
        {btnArray}
      </div>
    )
  }
}

ReceiptDelete.propTypes = {
  names: PropTypes.array.isRequired
}

export default ReceiptDelete
