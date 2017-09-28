import { asyncFetch, pageSize } from '@/lib/base'

export const GET_PAID_HISTORY = 'GET_PAID_HISTORY'
export const IS_LOADING = 'IS_LOADING'
export const LOAD_MORE = 'LOAD_MORE'
export const CLEAR_HISTORY = 'CLEAR_HISTORY'
export const SET_FILTER_TIME = 'SET_FILTER_TIME'

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
        paidHistory: data.data ? data.data.list : [],
        isLoading: false,
        noMore: noMore,
        loadMore: false,
        total_page: data.data ? data.data.pageCount : 0,
        cPage: cPage
      })
    }
  )
}

export const setFilterTime = (time) => ({
  type: SET_FILTER_TIME,
  time
})

export const actions = {
  getPaidHistory
}
export const isLoading = () => {
  return {
    type: IS_LOADING
  }
}

export const loadMore = () => {
  return {
    type: LOAD_MORE
  }
}

export const clearHistory = () => {
  return {
    type: CLEAR_HISTORY
  }
}

export const ACTIONS_HANDLERS = {
  [GET_PAID_HISTORY]: (state, action) => {
    return Object.assign({}, state, {
      paidHistory: [...state.paidHistory, ...action.paidHistory],
      isLoading: action.isLoading,
      noMore: action.noMore,
      loadMore: action.loadMore,
      total_page: action.total_page,
      cPage: action.cPage
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
  },
  [SET_FILTER_TIME]: (state, { time }) =>
    Object.assign({}, state, { time })
}
