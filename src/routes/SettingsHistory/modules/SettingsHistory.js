import { asyncFetch } from '@/lib/base'

export const GET_PAID_HISTORY = 'GET_PAID_HISTORY'

export const getPaidHistory = (time) => {
  let params = {}
  if (time) {
    params = {
      paidTime: time
    }
  }
  return asyncFetch(
    'get /expensesClaimPaids/paidHistory.json',
    params,
    (data, dispatch) => {
      let paidHistory = []
      let monthStr = ''
      let temp
      data.data.forEach((v) => {
        let paid = v.paidTime.split('-')
        v.paidDay = [paid[1], paid[2]].join('-')
        v.paidMonth = [paid[0], paid[1]].join('-')
        if (monthStr === v.paidMonth) {
          temp.push(v)
        } else {
          temp = paidHistory[paidHistory.length] = []
          monthStr = v.paidMonth
          temp.push(v)
        }
      })
      return dispatch({
        type: GET_PAID_HISTORY,
        paidHistory
      })
    }
  )
}

export const actions = {
  getPaidHistory
}

export const ACTIONS_HANDLERS = {
  [GET_PAID_HISTORY]: (state, action) => {
    return Object.assign({}, state, {
      paidHistory: action.paidHistory
    })
  }
}
