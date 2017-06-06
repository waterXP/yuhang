import { fetchData, fetchFail, FETCH_FAIL } from '../../../store/base'

export const GET_ACCOUNTS = 'GET_ACCOUNTS'
export const INITIAL_ACCOUNTS = 'INITIAL_ACCOUNTS'

export const getAccounts = () => {
  return (dispatch, getState) => {
    fetchData('get /userAccounts/myAccountList.json')
    .then((data) => {
      if (!data.result) {
        return dispatch({
          type: GET_ACCOUNTS,
          accounts: data.data
        })
      } else {
        return dispatch({
          type: FETCH_FAIL,
          err: data.msg || '系统忙，请稍后再试'
        })
      }
    })
    .catch((e) => {
      return dispatch({
        type: FETCH_FAIL,
        err: e
      })
    })
  }
}

export const initialAccounts = () => {
  return {
    type: INITIAL_ACCOUNTS
  }
}

export const actions = {
  getAccounts,
  initialAccounts
}

export const ACTION_HANDLERS = {
  [GET_ACCOUNTS]: (state, action) => {
    return Object.assign({}, state, {accounts: action.accounts})
  },
  [INITIAL_ACCOUNTS]: (state, action) => {
    return Object.assign({}, state, {accounts: []})
  }
}
