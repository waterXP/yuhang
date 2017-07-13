import { asyncFetch } from '@/lib/base'

export const GET_REJECT = 'GET_REJECT'
export const INITIAL_REJECT = 'INITIAL_REJECT'

export const getReject = () => {
  //=====
  return asyncFetch(
    'get expensesClaims/myList.json',
    {
      current_page:1,
      statusVal:3
    },
    (data, dispatch) => {
      //console.log(data.data);
      return dispatch({
        type: GET_REJECT,
        reject: data
      })
    }
  )
  //=====
}

export const initialReject = () => {
  return {
    type: INITIAL_REJECT
  }
}

export const actions = {
  getReject,
  initialReject
}

export const ACTION_HANDLERS = {
  [GET_REJECT]: (state, action) => {
    return Object.assign({}, state, {reject: action.reject})
  },
  [INITIAL_REJECT]: (state, action) => {
    return Object.assign({}, state, {reject: []})
  }
}










