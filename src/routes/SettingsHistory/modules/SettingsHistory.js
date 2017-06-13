import { fetchData, fetchFail, FETCH_FAIL } from '../../../store/base'

export const GET_PAID_HISTORY = 'GET_PAID_HISTORY'

export const getPaidHistory = (time) => {
  let params = {}
  if (time) {
    params = {
      paidTime: tiem
    }
  }
  return (dispatch, getState) => {
    fetchData('get /expensesClaimPaids/paidHistory', params)
    .then((data) => {
      if (!data.result) {
        return dispatch({
          type: GET_PAID_HISTORY,
          history: data.data
        })
      } else {
        return dispatch({
          type: FETCH_FAIL,
          err: data.msg || '系统忙，请稍后再试'
        })
      }
    })
  }
}

export const actions = {
  getPaidHistory
}

export const ACTIONS_HANDLERS = {
  [GET_PAID_HISTORY]: (state, action) => {
    return Object.assign({}, state, {
      history: action.history
    })
  }
}
