import { asyncFetch, pageSize } from '@/lib/base'

export const GET_PAID_HISTORY = 'GET_PAID_HISTORY'
export const IS_LOADING = 'IS_LOADING'
export const LOAD_MORE = 'LOAD_MORE'
export const CLEAR_HISTORY = 'CLEAR_HISTORY'

export const getPaidHistory = (time, cPage = 1, noMore = false) => {
  let params = {
    pageSize:pageSize,
    current_page:cPage
  }
  if (time) {
    params.paidTime = time
  }
  return asyncFetch(
    'get /expensesClaimPaids/paidHistory.json',
    params,
    (data, dispatch) => {

      return dispatch({
        type: GET_PAID_HISTORY,
        paidHistory:data.data.list,
        isLoading:false,
        noMore:noMore,
        loadMore:false,
        total_page:data.data.pageCount,
        cPage:cPage
      })
    }
  )
}

export const actions = {
  getPaidHistory
}
export const isLoading = () => {
  return {
    type:IS_LOADING
  }
}

export const loadMore = () => {
  return {
    type:LOAD_MORE
  }
}

export const clearHistory = () => {
  return {
    type:CLEAR_HISTORY
  }
}

export const ACTIONS_HANDLERS = {
  [GET_PAID_HISTORY]: (state, action) => {
    let historyList = state.paidHistory
    if (!historyList) {
      historyList=[]
    }
    let paidHistory = []
    let monthStr = ''
    let temp
    if (action.paidHistory) {
      action.paidHistory = action.paidHistory.concat(...historyList)
    }
    action.paidHistory.forEach((v) => {
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
    return Object.assign({}, state, {
      paidHistory:paidHistory,
      isLoading:action.isLoading,
      noMore:action.noMore,
      loadMore:action.loadMore,
      total_page:action.total_page,
      cPage:action.cPage
    })
  },
  [CLEAR_HISTORY]: (state) => {
    return Object.assign({}, state, { paidHistory: [] })
  },
  [LOAD_MORE]: (state) => {
    return Object.assign({}, state, { loadMore: true })
  },
  [IS_LOADING]: (state) => {
    return Object.assign({}, state, { isLoading: true })
  }
}
