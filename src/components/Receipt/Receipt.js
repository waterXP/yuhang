import React, { Component } from 'react'
import PropTypes from 'prop-types'
import ReceiptHeader from '../ReceiptHeader'
import ReceiptDetails from '../ReceiptDetails'
import ReceiptFlow from '../ReceiptFlow'
import ConfirmButton from '../ConfirmButton'

class Receipt extends Component {
  static propTypes = {
    data: PropTypes.object.isRequired,
    addComment: PropTypes.func.isRequired
  }

  handleClick = () => {
    this.props.addComment(this.props.data.master.expensesClaimId, 'just test')
  }

  render () {
    const { data } = this.props
    return (
      <div className='wm-receipt'>
        <ReceiptHeader data={data.master} />
        <ReceiptDetails data={data.detailsList} />
        <ReceiptFlow processList={[...data.processList, ...data.all]} attachmentList={data.attachmentList} />
        <ConfirmButton text='评论' handleClick={this.handleClick} />
      </div>
    )    
  }
}

export default Receipt
