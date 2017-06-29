import { asyncFetch } from '../../../lib/base'

export const GET_ACCOUNTS = 'GET_ACCOUNTS'
export const INITIAL_ACCOUNTS = 'INITIAL_ACCOUNTS'

export const getAccounts = () => {
  return asyncFetch(
    'get /userAccounts/myAccountList.json',
    {},
    (data, dispatch) => {
      return dispatch({
        type: GET_ACCOUNTS,
        accounts: data.data
      })
    }
  )
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
