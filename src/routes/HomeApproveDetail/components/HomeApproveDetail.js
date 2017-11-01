import React, { Component } from 'react'
import Receipt from '@/components/Receipt'
import { goLocation } from '@/lib/base'
import { confirm, dingSetNavRight, dingSetTitle } from '@/lib/ddApi'
import PropTypes from 'prop-types'
import NoData from '@/components/NoData'

class HomeApproveDetail extends Component {
  constructor () {
    super(...arguments)
    this.deleteExp = this::this.deleteExp
    this.commentHandler = this::this.commentHandler
  }
  componentWillMount () {
    const { id, type } = this.props.params
    this.props.initialApproveDetail()
    this.props.detailLoading()
    if (+type === 2) {
      this.props.getApproveDetail(id, true)
    } else {
      this.props.getApproveDetail(id, false)
    }
  }
  componentDidMount () {
    dingSetTitle('报销详情')
    dingSetNavRight('')
  }

  commentHandler () {
    const { id, type } = this.props.params
    goLocation({
      pathname: '/home/comment',
      query: {
        id,
        type
      }
    })
  }
  deleteExp (expensesClaimId) {
    const message = '请确认是否删除此报销单'
    const title = '提示'
    confirm(
      message,
      title,
      this.props.deleteExp.bind(
        null, expensesClaimId, this.props.params.type
      )
    )
  }

  render () {
    const { detail, isLoading, isBusy, params } = this.props
    const nType = +params.type
    if (detail && detail.master) {
      const { userName, deptName } = detail.master
      let title = ''
      if (userName) {
        title = userName + '的报销单'
      } else {
        title = deptName + '的报销单'
      }
      dingSetTitle(title)
      dingSetNavRight('')
    }
    return (
      <div className='wm-home-approve-detail'>
        { isLoading
          ? <NoData type='loading' />
          : detail && detail.master
          ? <Receipt
            data={detail}
            addComment={this.commentHandler}
            type={params.type}
            deleteExp={this.deleteExp}
            isBusy={isBusy}
            afterApproval={ nType !== 4 && nType !== 5 }
            reSubmit={ nType === 4 || nType === 5 }
          />
          : ''
        }
      </div>
    )
  }
}
HomeApproveDetail.propTypes = {
  detail:PropTypes.object.isRequired,
  params:PropTypes.object,
  getApproveDetail:PropTypes.func.isRequired,
  deleteExp:PropTypes.func.isRequired,
  initialApproveDetail:PropTypes.func.isRequired,
  detailLoading:PropTypes.func.isRequired,
  isBusy:PropTypes.bool.isRequired,
  isLoading:PropTypes.bool.isRequired
}

export default HomeApproveDetail
