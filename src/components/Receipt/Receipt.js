import React from 'react'
import PropTypes from 'prop-types'
import ReceiptHeader from '../ReceiptHeader'
import ReceiptDetails from '../ReceiptDetails'
import ReceiptFlow from '../ReceiptFlow'
import ConfirmButton from '../ConfirmButton'

export const Receipt = (props) => {
  return (
    <div className='wm-receipt'>
      <ReceiptHeader />
      <ReceiptDetails />
      <ReceiptFlow />
      <ConfirmButton text='评论' />
    </div>
  )
}

export default Receipt
