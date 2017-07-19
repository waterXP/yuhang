import React, { Component } from 'react'
import PropTypes from 'prop-types'
import ReceiptHeader from '../ReceiptHeader'
import ReceiptDetails from '../ReceiptDetails'
import ReceiptFlow from '../ReceiptFlow'
import ConfirmButton from '../ConfirmButton'
import './Receipt.scss'
import ReceiptDelete from '../ReceiptDelete'
import { goLocation } from '@/lib/base'
import NoData from '../NoData'

class Receipt extends Component {
  static propTypes = {
    data: PropTypes.object.isRequired,
    addComment: PropTypes.func.isRequired,
    type: PropTypes.any,
    isBusy: PropTypes.bool,
    deleteExp: PropTypes.func
  }
  handleClick = () => {
    let { type, addComment, data } = this.props
    let afterApproval = true
    let nType = +type
    if (nType === 2) {
      afterApproval = true
    } else if (nType === 4 || nType === 5) {
      afterApproval = false
    }
    addComment(data.master.expensesClaimId, 'just test', afterApproval)
  }

  render () {
    const { data, type, isBusy } = this.props
    let nType = +type
    if (!data.all) {
      data.all = []
    }
    return (
      <div className='wm-receipt'>
        <ReceiptHeader data={data.master} />
        <ReceiptDetails data={data.detailsList} />
        <ReceiptFlow
          processList={[...data.processList, ...data.all]}
          attachmentList={data.attachmentList}
        />
        <div className='fixed-bottom'>
          { nType === 5 || nType === 4
            ? <ReceiptDelete
              deleteExp={this.deleteExp}
              reSubmit={this.reSubmit}
            />
            : isBusy
              ? <NoData type='loading' text='添加评论中……' size='xsmall' />
              : <ConfirmButton text='评论' handleClick={this.handleClick} />
          }
        </div>
      </div>
    )
  }
  deleteExp = () => {
    let expensesClaimId = this.props.data.master.expensesClaimId
    this.props.deleteExp(expensesClaimId)
  }
  reSubmit = () => {
    let { expensesClaimId, expensesClaimNo } = this.props.data.master
    let url = {
      pathname:'/new',
      query: {
        id: expensesClaimId,
        expensesClaimNo: expensesClaimNo
      }
    }
    goLocation(url)
  }
}

export default Receipt
