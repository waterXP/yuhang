import { fetchData, fetchFail, FETCH_FAIL } from '../../../store/base'

export const GET_ACCOUNT_DETAIL = 'GET_ACCOUNT_DETAIL'
export const SAVE_DEFAULT = 'SAVE_DEFAULT'

export const getAccountDetail = (id) => {
  return (dispatch, getState) => {
    fetchData('get /userAccounts/updateMyAccount.json', { id })
    .then((data) => {
      if (!data.result) {
        return dispatch({
          type: GET_ACCOUNT_DETAIL,
          account: data.data
        })
      }
    })
  }
}

export const saveDefault = () => {
  return (dispatch, getState) => {
    console.log(getState())
    return
    // fetchData('post /userAccounts/updateMyAccount.json', {})
  }
}

export const actions = {
  getAccountDetail,
  saveDefault
}

export const ACTION_HANDLERS = {
  [GET_ACCOUNT_DETAIL]: (state, action) =>
    Object.assign({}, state, {currentAccount: action.account})
}
