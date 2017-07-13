import React, { Component } from 'react'
import PropTypes from 'prop-types'
import ReceiptHeader from '../ReceiptHeader'
import ReceiptDetails from '../ReceiptDetails'
import ReceiptFlow from '../ReceiptFlow'
import ConfirmButton from '../ConfirmButton'
import NoData from '../NoData'

class Receipt extends Component {
  static propTypes = {
    data: PropTypes.object.isRequired,
    addComment: PropTypes.func.isRequired
  }

  handleClick = () => {
    this.props.addComment(this.props.data.master.expensesClaimId, 'just test')
  }

  render () {
    const { data, isBusy } = this.props
    if(!data.all){
      data.all = []
    }
    return (
      <div className='wm-receipt'>
        <ReceiptHeader data={ data.master } />
        <ReceiptDetails data={ data.detailsList } />
        <ReceiptFlow processList={ [...data.processList, ...data.all] } attachmentList={ data.attachmentList } />
        { isBusy ?
          <NoData type='loading' text='添加评论中……' size='xsmall' /> :
          <ConfirmButton text='评论' handleClick={ this.handleClick } />
        }
      </div>
    )
  }
}

export default Receipt
