import {dingHidePreLoad,dingShowPreLoad,asyncFetch} from '@/lib/base'
export const GET_APPROVE = 'GET_APPROVE'
export const INITIAL_APPROVE = 'INITIAL_APPROVE'
export const GET_APPROVE_SUMMONEY = "GET_APPROVE_SUMMONEY"

export const getApproveList = (cPage=1) => {
  //=====
  return asyncFetch(
    'get expensesClaimsMobile/approveList.json',
    {
      current_page:cPage
    },
    (data, dispatch) => {
      //console.log(data.data);
      let dataCell=data.data
      if(dataCell){
        dataCell.cPage=cPage
      }
      return dispatch({
        type: GET_APPROVE,
        approve: dataCell
      })
    }
  )
  //=====
}
export const getSumMoney=()=>{
  return asyncFetch(
    'get expensesClaimsMobile/getSumMoney.json',
    {type:1},
    (data, dispatch) => {
      //console.log(data.data);
      return dispatch({
        type: GET_APPROVE_SUMMONEY,
        approveSumMoney: data.data
      })
    }
  )
}

export const initialApprove = () => {
  return {
    type: INITIAL_APPROVE
  }
}

export const actions = {
  getApproveList,
  initialApprove,
  getSumMoney
}

export const ACTION_HANDLERS = {
  [GET_APPROVE]: (state, action) => {
    let approveList=state.approve.list
    if(!approveList){
      approveList=[]
    }
    if(action.approve.list){
      action.approve.list=approveList.concat(action.approve.list)
    }
    return Object.assign({}, state, {approve: action.approve})
  },
  [GET_APPROVE_SUMMONEY]:(state,action)=>{
    return Object.assign({},state,{approveSumMoney:action.approveSumMoney})
  },
  [INITIAL_APPROVE]: (state, action) => {
    return Object.assign({}, state, {approve: []})
  }
}










