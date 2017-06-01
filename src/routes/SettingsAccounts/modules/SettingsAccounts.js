import { fetchData, fetchFail, FETCH_FAIL } from '../../../store/base'

export const GET_ACCOUNTS = 'GET_ACCOUNTS'

let accounts = [];
export const getAccounts = (page=1) => {
  if (page === 1) {
    accounts = [];
  }
  return (dispatch, getState) => {
    fetchData('get /userAccounts/list.json', {
      current_page: page
    })
    .then((data) => {      
      console.log(data)
      if (!data.result) {
        accounts = [...accounts, ...data.data]
        pagination = data.page
        if (pagination && pagination.next_page) {
          fetchData('get /userAccounts/list.json', {
            current_page: pagination.next_page
          })
        } else {
          return dispatch({
            type: GET_ACCOUNTS,
            accounts: accounts
          })        
        }
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

export const actions = {
  getAccounts
}

const ACTION_HANDLERS = {
  [GET_ACCOUNTS]: (state, action) =>
    Object.assign({}, state, {accounts: action.accounts})
}

const initialState = {}
export default function (state = initialState, action) {
  const handler = ACTION_HANDLERS[action.type]
  return handler ? handler(state, action) : state
}

