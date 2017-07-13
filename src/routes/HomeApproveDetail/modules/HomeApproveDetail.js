import { asyncFetch } from '@/lib/base'

export const GET_APPROVE_DETAIL = 'GET_APPROVE_DETAIL'
export const INITIAL_APPROVE_DETAIL = 'INITIAL_APPROVE_DETAIL'

export const getApproveDetail = (expensesClaimsId=1) => {
  //=====
  return asyncFetch(
    'get expensesClaimsView/approveDetail.json',
    {
      expensesClaimsId:expensesClaimsId
    },
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

export const actions = {
  getApproveDetail,
  initialApproveDetail
}

export const ACTION_HANDLERS = {
  [GET_APPROVE_DETAIL]: (state, action) => {
    //console.log('============action===============',action.detail)
    return Object.assign({}, state, {detail: action.detail})
  },
  [INITIAL_APPROVE_DETAIL]: (state, action) => {
    return Object.assign({}, state, {detail: {}})
  }
}










