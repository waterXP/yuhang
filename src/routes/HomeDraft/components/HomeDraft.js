import React,{Component} from "react"
import HomeDraft from "@/components/HomeDraft"
import NoData from '@/components/NoData'
import { dingSetTitle } from '@/lib/base'
import './HomeDraft.scss'

class HomeDraftList extends Component{
  constructor(){
    super()
    this.deleteExp=this.deleteExp.bind(this)
    this.scrollHandler=this.scrollHandler.bind(this)
    this.getOffsetHeight=this.getOffsetHeight.bind(this)
  }
  render(){
    let { draft,loading,noMore,loadMoreBool }=this.props
    let noData=false
    if(!loading){

      if(draft.data && draft.data.length!==0){
        // 没有数据
      }else{
        noData=true
      }
    }

    return (
      <div className='wm-draft-list' onScroll={this.scrollHandler}>
      {
        loading?<NoData type='loading'/>:
        noData?<NoData type='nodata' />:
         <HomeDraft type={1} reject={draft} deleteExp={this.deleteExp} getOffsetHeight={this.getOffsetHeight} noMore={noMore}/>
      }
      { loadMoreBool && <NoData type='loading' size='small'/> }
      </div>
    )
  }
  componentWillMount(){
    this.props.isLoading()
    this.props.getDraft()
    this.props.clearDraft()
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
    let deviceHeight = document.documentElement.clientHeight || document.body.clientHeight

    if(deviceHeight+scrollTop+50>height && !isLoading){
      if(current_page+1 === total_page){
        this.props.loadMore()
        this.props.getDraft(current_page+1,true)
      }else if(current_page+1<total_page){
        this.props.loadMore()
        this.props.getDraft(current_page+1,false)
      }
    }
    //console.log('============',this.props.loadMoreBool)
  }
  componentDidMount(){
    dingSetTitle('草稿')
  }
}

export default HomeDraftList
