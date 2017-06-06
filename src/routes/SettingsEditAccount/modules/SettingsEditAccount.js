import { fetchData, fetchFail, FETCH_FAIL } from '../../../store/base'

export const GET_ACCOUNT_DETAIL = 'GET_ACCOUNT_DETAIL'

export const getAccountDetail = () => {
  return (dispatch, getState) => {
    const id = getState().location.query.id
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

export const actions = {
  getAccountDetail
}

const ACTION_HANDLERS = {
  [GET_ACCOUNT_DETAIL]: (state, action) =>
    Object.assign({}, state, {currentAccount: action.account})
}

const initialState = {}
export default function (state = initialState, action) {
  const handler = ACTION_HANDLERS[action.type]
  return handler ? handler(state, action) : state
}

