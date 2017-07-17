import React, { Component } from 'react'
import PropTypes from 'prop-types'
import ReceiptHeader from '../ReceiptHeader'
import ReceiptDetails from '../ReceiptDetails'
import ReceiptFlow from '../ReceiptFlow'
import ConfirmButton from '../ConfirmButton'
import './Receipt.scss'
import ReceiptDelete from '../ReceiptButton/ReceiptDelete'
import { goLocation } from '@/lib/base'
import NoData from '../NoData'


class Receipt extends Component {
  static propTypes = {
    data: PropTypes.object.isRequired,
    addComment: PropTypes.func.isRequired
  }
  handleClick = () => {
    let { type } = this.props
    let afterApproval=true
    if(type==2){
      afterApproval=true
    }else if( type==4 || type==5 ){
      afterApproval=false
    }
    this.props.addComment(this.props.data.master.expensesClaimId, 'just test',afterApproval)
  }

  render () {
    const { data,type,isBusy } = this.props
    // type 4 已拒绝
    // type 5 已撤销

    if(!data.all){
      data.all = []
    }
    return (
      <div className='wm-receipt'>
        <ReceiptHeader data={data.master} />
        <ReceiptDetails data={data.detailsList} />
        <ReceiptFlow processList={[...data.processList, ...data.all]} attachmentList={data.attachmentList} />
        <div className='fixed-bottom'>
          {
            type==5 || type==4?
            <ReceiptDelete deleteExp={this.deleteExp} reSubmit={this.reSubmit} />
            :
            isBusy ?
            <NoData type='loading' text='添加评论中……' size='xsmall' /> :
            <ConfirmButton text='评论' handleClick={ this.handleClick } />
          }
        </div>
      </div>
    )
  }
  deleteExp=()=>{
    let expensesClaimId=this.props.data.master.expensesClaimId
    this.props.deleteExp(expensesClaimId)
  }
  reSubmit=()=>{
    //console.log(this.props.data.master)
    let { expensesClaimId,expensesClaimNo } = this.props.data.master
    let url={
          pathname:'/new',
          query: {
            id: expensesClaimId,
            expensesClaimNo:expensesClaimNo
          }
        }
      goLocation(url)
  }
}

export default Receipt
