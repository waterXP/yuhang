import { asyncFetch,goLocation,fetchData } from '@/lib/base'

export const GET_APPROVE_DETAIL = 'GET_APPROVE_DETAIL'
export const INITIAL_APPROVE_DETAIL = 'INITIAL_APPROVE_DETAIL'
export const DELETE_EXP = 'DELETE_EXP'

export const getApproveDetail = (expensesClaimsId=1,detailType) => {
  //=====
  let params={}
  if(detailType){
    params={
      expensesClaimsId:expensesClaimsId,
      type:'afterApproval',
      showAttachments:true,
      isRead:true
    }
  }else{
    params={
      expensesClaimsId:expensesClaimsId
    }
  }
  return asyncFetch(
    'get expensesClaimsView/approveDetail.json',
    params,
    (data, dispatch) => {
      return dispatch({
        type: GET_APPROVE_DETAIL,
        detail: data.data
      })
    }
  )
  //=====
}

export const initialApproveDetail = () => {
  return {
    type: INITIAL_APPROVE_DETAIL
  }
}

export const deleteExp = (expensesClaimsId,type)=>{
  return asyncFetch(
    'get expensesClaims/delete.json',
    {
      id:expensesClaimsId
    },
    (data,dispatch) => {
      //dispatch(getDraft())
      if(type==5){
        // 已撤回
        goLocation('/home/undo')
      }else if(type==4){
        goLocation('/home/reject')
      }
    }
  )
}

export const addComment = (expensesClaimId, remark,afterApproval) => {
  return (dispatch, getState) => {
    fetchData('post /expensesClaimComments/add.json', {
      expensesClaimId,
      remark
    }).then((data) => {
      if (data.result === 0) {
        dispatch(getApproveDetail(expensesClaimId,afterApproval))
      } else {
        toast(data.msg)
      }
    })
  }
}

/*export const actions = {
  getApproveDetail,
  initialApproveDetail
}*/

export const ACTION_HANDLERS = {
  [GET_APPROVE_DETAIL]: (state, action) => {
    //console.log('============action===============',action.detail)
    return Object.assign({}, state, {detail: action.detail})
  },
  [INITIAL_APPROVE_DETAIL]: (state, action) => {
    return Object.assign({}, state, {detail: {}})
  }
}










