import React, { Component } from 'react'
import PropTypes from 'prop-types'
import ReceiptHeader from './ReceiptHeader'
import ReceiptDetails from './ReceiptDetails'
import ReceiptHistory from './ReceiptHistory'
import ReceiptFlow from './ReceiptFlow'
import ReceiptAttchment from './ReceiptAttchment'
import './Receipt.scss'
import { goLocation } from '@/lib/base'

class Receipt extends Component {
  static propTypes = {
    data: PropTypes.object.isRequired
  }
  render () {
    const { data } = this.props
    const allData = data.all || []
    return (
      <div className='wm-receipt'>
        <ReceiptHeader data={data.master} />
        <ReceiptDetails data={data.detailsList} title='明细' />
        { data.approveHistory &&
          <ReceiptHistory data={data.approveHistory} />
        }
        { data.attachmentList && data.attachmentList.length > 0 &&
          <ReceiptAttchment attachmentList={data.attachmentList} />
        }
        <ReceiptFlow
          processList={[...data.processList, ...allData]} />
      </div>
    )
  }
}

export default Receipt
