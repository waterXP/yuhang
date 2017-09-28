import React, { Component } from 'react'
import Receipt from '@/components/Receipt'
import { confirm, dingSetNavRight, dingSetTitle, goLocation } from '@/lib/base'
import PropTypes from 'prop-types'
import NoData from '@/components/NoData'

class HomeApproveDetail extends Component {
  constructor () {
    super()
    this.deleteExp = this.deleteExp.bind(this)
    this.commentHandler = this.commentHandler.bind(this)
  }
  componentWillMount () {
    let { id, type } = this.props.params
    this.props.initialApproveDetail()
    this.props.detailLoading()
    if (+type === 2) {
      this.props.getApproveDetail(id, true)
    } else {
      this.props.getApproveDetail(id, false)
    }
  }

  commentHandler () {
    const { id, type } = this.props.params
    console.log(id, type)
    goLocation({
      pathname: '/home/comment',
      query: {
        id,
        type
      }
    })
  }
  deleteExp (expensesClaimId) {
    let message = '请确认是否删除此报销单'
    let title = '提示'
    confirm(message, title, this.props.deleteExp.bind(null, expensesClaimId, this.props.params.type))
  }

  render () {
    let { detail, isLoading, isBusy } = this.props
    if (detail && detail.master) {
      let { userName, deptName } = detail.master
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
      <div>
        { isLoading
          ? <NoData type='loading' />
          : detail && detail.master
          ? <Receipt
            data={this.props.detail}
            addComment={this.commentHandler}
            type={this.props.params.type}
            deleteExp={this.deleteExp}
            isBusy={isBusy}
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
