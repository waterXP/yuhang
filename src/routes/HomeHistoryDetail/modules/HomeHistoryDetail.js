import { fetchData, FETCH_FAIL } from '@/lib/base'
import { toast } from '@/lib/ddApi'

const GET_HISTORY_DETAIL = 'GET_HISTORY_DETAIL'
const IN_BUSY = 'IN_BUSY'

const fetchHistoryDetail = (dispatch, id) => {
  fetchData('get /expensesClaimsView/approveDetail.json', {
    expensesClaimsId: id,
    showAttachments: true,
    type: 'afterApproval'
  }).then((data) => {
    if (data.result === 0) {
      return dispatch({
        type: GET_HISTORY_DETAIL,
        data: data.data,
        isLoading: false
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

export const inBusy = (state) => {
  return {
    type: IN_BUSY,
    state
  }
}

export const getHistoryDetail = (id) => {
  return (dispatch, getState) => {
    fetchHistoryDetail(dispatch, id)
  }
}

export const addComment = (expensesClaimId, remark, cb) => {
  return (dispatch, getState) => {
    dispatch(inBusy(true))
    fetchData('post /expensesClaimComments/add.json', {
      expensesClaimId,
      remark
    }).then((data) => {
      if (data.result === 0) {
        dispatch(inBusy(false))
        cb && cb()
        // fetchHistoryDetail(dispatch, expensesClaimId)
      } else {
        toast(data.msg)
      }
    })
  }
}

export const ACTIONS_HANDLERS = {
  [IN_BUSY]: (state, action) =>
    Object.assign({}, state, { isBusy: action.state }),
  [GET_HISTORY_DETAIL]: (state, action) => {
    return Object.assign({}, state, {
      historyDetail: action.data,
      isLoading: action.isLoading
    })
  }
}
