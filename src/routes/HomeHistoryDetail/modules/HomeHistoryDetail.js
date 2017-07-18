import { fetchData, toast, FETCH_FAIL } from '@/lib/base'

const GET_HISTORY_DETAIL = 'GET_HISTORY_DETAIL'
const ADD_COMMENT = 'ADD_COMMENT'

const fetchHistoryDetail = (dispatch, id) => {
  fetchData('get /expensesClaimsView/approveDetail.json', {
    expensesClaimsId: id,
    showAttachments: true,
    type: 'afterApproval'
  }).then((data) => {
    if (data.result === 0) {
      return dispatch({
        type: GET_HISTORY_DETAIL,
        data: data.data
      })            
    } else {
      toast(data.msg)
      return dispatch({
        type: FETCH_FAIL,
        err: data.msg || '系统忙，请稍后再试'
      })
    }
  }).catch((e) => {
    return dispatch({
      type: FETCH_FAIL,
      err: e
    })
  })
}

export const getHistoryDetail = (id) => {
  return (dispatch, getState) => {
    fetchHistoryDetail(dispatch, id)
  }
}

export const addComment = (expensesClaimId, remark) => {
  return (dispatch, getState) => {
    fetchData('post /expensesClaimComments/add.json', {
      expensesClaimId,
      remark
    }).then((data) => {
      if (data.result === 0) {
        fetchHistoryDetail(dispatch, expensesClaimId)
      } else {
        toast(data.msg)
      }
    })
  }
}

export const ACTIONS_HANDLERS = {
  [GET_HISTORY_DETAIL]: (state, action) => {
    return Object.assign({}, state, {
      historyDetail: action.data
    })
  }
}
