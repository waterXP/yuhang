import { asyncFetch, dingHidePreLoad, pageSize } from '@/lib/base'

export const GET_NOT_PAID = 'GET_NOT_PAID'
export const INITIAL_NOT_PAID = 'INITIAL_NOT_PAID'
export const GET_NOT_PAID_SUMMONEY = 'GET_NOT_PAID_SUMMONEY'
export const IS_LOADING = 'IS_LOADING'
export const LOAD_MORE = 'LOAD_MORE'

export const getNotPaid = (cPage = 1, noMore = false) => {
  return asyncFetch(
    'get expensesClaimsMobile/waitPaidList.json',
    {
      current_page: cPage,
      pageSize: pageSize
    },
    (data, dispatch) => {
      let dataCell = data.data
      if (dataCell) {
        dataCell.cPage = cPage
      }
      dingHidePreLoad()
      return dispatch({
        type: GET_NOT_PAID,
        notPaid: dataCell,
        noMore:noMore,
        isLoading:false,
        loadMore:false
      })
    }
  )
}
export const getSumMoney = () => {
  return asyncFetch(
    'get expensesClaimsMobile/getSumMoney.json',
    { type: 2 },
    (data, dispatch) => {
      return dispatch({
        type: GET_NOT_PAID_SUMMONEY,
        notPaidSumMoney: data.data
      })
    }
  )
}

export const initialNotPaid = () => {
  return {
    type: INITIAL_NOT_PAID
  }
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

export const ACTION_HANDLERS = {
  [GET_NOT_PAID]: (state, action) => {
    let approveList = state.notPaid.list
    if (!approveList) {
      approveList = []
    }
    if (action.notPaid.list) {
      action.notPaid.list = approveList.concat(action.notPaid.list)
    }
    return Object.assign({}, state, { notPaid: action.notPaid },
      { isLoading: action.isLoading }, { noMore: action.noMore }, { loadMore: action.loadMore })
  },
  [GET_NOT_PAID_SUMMONEY]: (state, action) => {
    return Object.assign({}, state, { notPaidSumMoney: action.notPaidSumMoney })
  },
  [INITIAL_NOT_PAID]: (state, action) => {
    return Object.assign({}, state, { notPaid: {} })
  },
  [IS_LOADING]: (state) => {
    return Object.assign({}, state, { isLoading: true })
  },
  [LOAD_MORE]: (state, action) => {
    return Object.assign({}, state, { loadMore:true })
  }
}
