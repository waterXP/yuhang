import React, { Component } from 'react'
import PropTypes from 'prop-types'
import Receipt from '@/components/Receipt'
import { dingSetNavRight, dingSetTitle } from '@/lib/base'

class HomeHistoryDetail extends Component {
  static propTypes = {
    getHistoryDetail: PropTypes.func.isRequired,
    historyDetail: PropTypes.object.isRequired,
    query: PropTypes.object.isRequired,
    addComment: PropTypes.func
  }

  componentDidMount () {
    if (this.props.query.id) {
      this.props.getHistoryDetail(this.props.query.id)
    }
  }

  render () {
    const { historyDetail, query, addComment } = this.props
    //console.log('=================',this.props.historyDetail)
    if(historyDetail.master){
      let { userName,deptName } = historyDetail.master
      let title = ''
      if( userName ){
        title = userName + '的报销单'
      }else{
        title = deptName + '的报销单'
      }
      dingSetTitle(title)
      dingSetNavRight('')
    }
    return (
      <div>{historyDetail.master &&
        (+query.id === historyDetail.master.expensesClaimId) &&
        <Receipt data={historyDetail} addComment={addComment} type={3} />}
      </div>
    )
  }
}

export default HomeHistoryDetail

