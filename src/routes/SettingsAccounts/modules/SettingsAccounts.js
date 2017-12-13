import { asyncFetch, fetchData, FETCH_FAIL } from '@/lib/base'

export const GET_ACCOUNTS = 'GET_ACCOUNTS'
export const DEL_ACCOUNTS = 'DEL_ACCOUNTS'
export const INITIAL_ACCOUNTS = 'INITIAL_ACCOUNTS'

const _getAccounts = (dispatch, getState) => {
  fetchData('get /userAccounts/myAccountList.json', {})
  .then((data) => {
    return dispatch({
      type: GET_ACCOUNTS,
      accounts: data.data
    })
  })
  .catch((e) => {
    return dispatch({
      type: FETCH_FAIL,
      err: e
    })
  })
}
export const getAccounts = () => _getAccounts
export const delAccounts = (accounts) => {
  const userAccountIds = accounts.join(',')
  return asyncFetch(
    'post /userAccounts/deleteBatch.json',
    {
      type: 'my',
      userAccountIds
    },
    (data, dispatch, getState) => _getAccounts(dispatch, getState)
  )
}
export const initialAccounts = () => {
  return {
    type: INITIAL_ACCOUNTS
  }
}

export const actions = {
  getAccounts,
  delAccounts,
  initialAccounts
}

export const ACTION_HANDLERS = {
  [GET_ACCOUNTS]: (state, action) => {
    return Object.assign({}, state, { accounts: action.accounts || [] })
  },
  [INITIAL_ACCOUNTS]: (state, action) => {
    return Object.assign({}, state, { accounts: [] })
  }
}
