import { dingHidePreLoad, asyncFetch, pageSize } from '@/lib/base'

export const GET_APPROVE = 'GET_APPROVE'
export const INITIAL_APPROVE = 'INITIAL_APPROVE'
export const GET_APPROVE_SUMMONEY = 'GET_APPROVE_SUMMONEY'
export const IS_LOADING = 'IS_LOADING'
export const NOMORE = 'NOMORE'
export const GET_OFFSET_HEIGHT = 'GET_OFFSET_HEIGHT'
export const LOAD_MORE = 'LOAD_MORE'

export const getApproveList = (cPage = 1, noMore = false) => {
  return asyncFetch(
    'get expensesClaimsMobile/approveList.json',
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
        type: GET_APPROVE,
        approve: dataCell,
        isLoading: false,
        noMore: noMore,
        loadMore: false
      })
    }
  )
}
export const getSumMoney = () => {
  return asyncFetch(
    'get expensesClaimsMobile/getSumMoney.json',
    { type: 1 },
    (data, dispatch) => {
      return dispatch({
        type: GET_APPROVE_SUMMONEY,
        approveSumMoney: data.data
      })
    }
  )
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

export const initialApprove = () => {
  return {
    type: INITIAL_APPROVE
  }
}

export const getOffsetHeight = (num) => {
  return {
    type: GET_OFFSET_HEIGHT,
    offsetHeight: num
  }
}

export const actions = {
  getApproveList,
  initialApprove,
  getSumMoney,
  isLoading
}

export const ACTION_HANDLERS = {
  [IS_LOADING]: (state) => {
    return Object.assign({}, state, { isLoading: true })
  },
  [GET_APPROVE]: (state, action) => {
    let approveList = state.approve.list
    if (!approveList) {
      approveList = []
    }
    if (action.approve.list) {
      action.approve.list = approveList.concat(action.approve.list)
    }
    return Object.assign({}, state, { approve: action.approve },
      { isLoading: action.isLoading }, { noMore: action.noMore }, { loadMore:action.loadMore })
  },
  [GET_APPROVE_SUMMONEY]: (state, action) => {
    return Object.assign({}, state, { approveSumMoney: action.approveSumMoney })
  },
  [INITIAL_APPROVE]: (state, action) => {
    return Object.assign({}, state, { approve: {} })
  },
  [GET_OFFSET_HEIGHT]: (state, action) => {
    return Object.assign({}, state, { offsetHeight: action.offsetHeight })
  },
  [LOAD_MORE]: (state, action) => {
    return Object.assign({}, state, { loadMore: true })
  }
}
