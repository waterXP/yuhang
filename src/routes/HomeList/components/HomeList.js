import React, {Component} from "react"
import PropTypes from 'prop-types'
import HomeApproveList from "@/components/HomeApproveList"
import HomeNotPaid from "@/components/HomeNotPaid"
import HomeDraft from "@/components/HomeDraft"
import { alert, dingShowPreLoad, dingSetTitle } from '@/lib/base'
import NoData from '@/components/NoData'
import './HomeList.scss'

class HomeList extends Component {
  constructor(){
    super()
    this.scrollHandler = this.scrollHandler.bind(this)
    this.getOffsetHeight = this.getOffsetHeight.bind(this)
    this.deleteExp = this.deleteExp.bind(this)
  }
  render(){
    let { approve, loading, loadMore, noMore, approveSumMoney } = this.props.approve
    let hasNoData=false
    if (!loading){
      let approveList = approve.list
      if (approveList && approveList.length !==0) {
        //存在数据
      } else {
        // 不存在数据
        hasNoData = true
      }
    }
    let switchList = ''
    switch(this.type){
      case 1 :
        switchList = <HomeApproveList
                  approve={approve}
                  getOffsetHeight={this.getOffsetHeight}
                  noMore={noMore}
                  approveSumMoney={approveSumMoney}
                  type={this.type} />
        break
      case 2 :
        switchList = <HomeNotPaid
                  approve={approve}
                  getOffsetHeight={this.getOffsetHeight}
                  noMore={noMore}
                  approveSumMoney={approveSumMoney}
                  type={this.type}/>
        break
      case 4 :
      case 6 :
        switchList = <HomeDraft
                  type={this.type}
                  approve={approve}
                  deleteExp={this.deleteExp}
                  noMore={noMore}
                  getOffsetHeight={this.getOffsetHeight} />
        break
      case 5 :
        switchList = <HomeDraft
                  type={this.type}
                  approve={approve}
                  noMore={noMore}
                  getOffsetHeight={this.getOffsetHeight}/>
        break
      default :
        switchList = null
    }
    return (
      <div className='wm-approve-list' onScroll={this.scrollHandler}>
        {loading
          ? <NoData type='loading' />
          : hasNoData
            ? <NoData type='nodata' />
            : switchList
        }
        {loadMore && <NoData type='loading' size='small' />}
      </div>
    )
  }
  getOffsetHeight(approveList){
    let height=0
    if(approveList){
      height=approveList.offsetHeight
    }
    this.offsetHeight=height
  }
  componentWillMount(){
    this.type = parseInt(this.props.location.query.type)
    let { initialApprove, getApproveList,getSumMoney,isLoading } = this.props
    initialApprove()
    getApproveList(1,false,this.type)
    if (this.type === 1) {
      getSumMoney(1)
    } else if (this.type ===2) {
      getSumMoney(2)
    }

    isLoading()
  }
  scrollHandler(e){
    let cPage = this.props.approve.approve.cPage
    let pageCount = this.props.approve.approve.pageCount
    let isLoading = this.props.approve.loadMore

    let scrollTop = e.target.scrollTop
    let height = this.offsetHeight
    let deviceHeight = document.documentElement.clientHeight || document.body.clientHeight

    if (deviceHeight+scrollTop+50 > height && !isLoading) {
      if(cPage+1 === pageCount){
        this.props.loadMore()
        this.props.getApproveList(cPage+1,true,this.type)
        this.loadMore = true
      }else if(cPage+1 < pageCount){
        this.props.loadMore()
        this.loadMore = false
        this.props.getApproveList(cPage+1,false,this.type)
      }
    }
  }
  deleteExp(expensesClaimsId){
    this.props.deleteExp(expensesClaimsId,1,this.loadMore,this.type)
  }
  componentDidMount(){
    switch(this.type){
      case 1 :
        dingSetTitle('审批中')
        break
      case 2 :
        dingSetTitle('未发放')
        break
      case 4 :
        dingSetTitle('已撤回')
        break
      case 5 :
        dingSetTitle('已拒绝')
        break
      case 6 :
        dingSetTitle('草稿')
        break
      default :
        dingSetTitle('明快报销')
    }

    /*dd.ui.pullToRefresh.enable({
        onSuccess: function() {
          console.log('success')
        },
        onFail: function() {
        }
    })*/

  }
}
HomeList.propTypes={
  approve:PropTypes.shape({
    approve:PropTypes.object.isRequired,
    loading:PropTypes.bool.isRequired,
    loadMore:PropTypes.bool.isRequired,
    noMore:PropTypes.bool.isRequired,
    approveSumMoney:PropTypes.number.isRequired
  })
}

export default HomeList
