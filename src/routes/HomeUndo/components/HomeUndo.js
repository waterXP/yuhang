import React,{Component} from "react";
import HomeDraft from "@/components/HomeDraft"
import NoData from '@/components/NoData'
import { dingSetNavLeft,dingSetTitle } from '@/lib/base'

class HomeUndoList extends Component{
  constructor(){
    super()
    this.deleteExp=this.deleteExp.bind(this)
    this.scrollHandler=this.scrollHandler.bind(this)
    this.getOffsetHeight=this.getOffsetHeight.bind(this)
  }
  render(){
    let { undo,loading,noMore,loadMoreBool }=this.props

    let noData = false
    if(!loading){
      if(undo.data && undo.data.length!==0){
        // 有数据
      }else{
        noData=true
      }
    }
    return (
      <div className='wm-undo-list' onScroll={this.scrollHandler}>
      {
        loading?
        <NoData type='loading' />:
        noData?
        <NoData type='nodata' />:
        <HomeDraft type={2} reject={undo} deleteExp={this.deleteExp} noMore={noMore} getOffsetHeight={this.getOffsetHeight} />
      }
      { loadMoreBool && <NoData type='loading' size='small' /> }
      </div>
    )
  }
  componentWillMount(){
    this.props.getUndo()
    this.props.initialUndo()
    this.props.isLoading()
  }
  componentDidMount(){
    //dingSetNavLeft('已撤回')
    dingSetTitle('已撤回')
  }
  deleteExp(expensesClaimsId){
    this.props.deleteExp(expensesClaimsId)
  }
  getOffsetHeight(approveList){
    let height=0
    if(approveList){
      height=approveList.offsetHeight
    }
    this.offsetHeight=height
  }
  scrollHandler(e){
    let isLoading = this.props.loadMoreBool
    let { current_page,total_page }=this.props.draft.page

    let scrollTop = e.target.scrollTop
    let height = this.offsetHeight
    let deviceHeight = document.documentElement.clientHeight

    if(deviceHeight+scrollTop+50>height && !isLoading){
      if(current_page+1 === total_page){
        this.props.loadMore()
        this.props.getUndo(current_page+1,true)
      }else if(current_page+1<total_page){
        this.props.loadMore()
        this.props.getUndo(current_page+1,false)
      }
    }
    //console.log('============',this.props.loadMoreBool)
  }
}

export default HomeUndoList
