import React, { Component } from 'react'
import PropTypes from 'prop-types'
import Receipt from '@/components/Receipt'
import ReceiptButtons from '@/components/Receipt/ReceiptButtons'
import { goLocation } from '@/lib/base'
import { dingSetNavRight, dingSetTitle } from '@/lib/ddApi'
import NoData from '@/components/NoData'
import './HomeHistoryDetail.scss'

class HomeHistoryDetail extends Component {
  static propTypes = {
    getHistoryDetail: PropTypes.func.isRequired,
    historyDetail: PropTypes.object.isRequired,
    query: PropTypes.object.isRequired,
    detailLoading: PropTypes.func,
    isLoading: PropTypes.bool
  }
  constructor () {
    super(...arguments)
    this.commentHandler = this::this.commentHandler
  }
  commentHandler () {
    const { id } = this.props.query
    goLocation({
      pathname: '/home/comment',
      query: {
        id,
        fromPage: '/home/history/detail'
      }
    })
  }
  componentDidMount () {
    dingSetTitle('报销详情')
    dingSetNavRight('')
    if (this.props.query.id) {
      this.props.getHistoryDetail(this.props.query.id)
    }
    this.props.detailLoading()
  }

  render () {
    const { historyDetail, query, isLoading } = this.props
    const buttons = [{
        text: '评论',
        func: this.commentHandler
      }]
    return (
      <div className='wm-home-history-detail'>
        { isLoading
          ? <NoData type='loading' />
          : historyDetail.master &&
            (+query.id === historyDetail.master.expensesClaimId) &&
            <div className='content'>
              <Receipt
                data={historyDetail}
              />
              <ReceiptButtons
                btns={buttons}
              />
            </div>
        }
      </div>
    )
  }
}

export default HomeHistoryDetail
