import { asyncFetch, dingHidePreLoad, pageSize } from '@/lib/base'

export const GET_REJECT = 'GET_REJECT'
export const INITIAL_REJECT = 'INITIAL_REJECT'
export const IS_LOADING_REJECT = 'IS_LOADING_REJECT'
export const LOAD_MORE = 'LOAD_MORE'

export const getReject = (cPage = 1, noMore = false) => {
  return asyncFetch(
    'get expensesClaims/myList.json',
    {
      current_page: cPage,
      statusVal: 3,
      pageSize: pageSize
    },
    (data, dispatch) => {
      dingHidePreLoad()
      return dispatch({
        type: GET_REJECT,
        reject: data,
        isLoading:false,
        noMore:noMore,
        LOAD_MORE:false
      })
    }
  )
}

export const initialReject = () => {
  return {
    type: INITIAL_REJECT
  }
}

export const isLoading = () => {
  return {
    type: IS_LOADING_REJECT
  }
}
export const loadMore = () => {
  return {
    type: LOAD_MORE
  }
}

export const ACTION_HANDLERS = {
  [IS_LOADING_REJECT]: (state) => {
    return Object.assign({}, state, { isLoading: true })
  },
  [GET_REJECT]: (state, action) => {
    let approveList = state.reject.data
    if (!approveList) {
      approveList = []
    }
    if (action.reject.data) {
      action.reject.list = approveList.concat(action.reject.list)
    }
    return Object.assign({}, state, { reject: action.reject },
      { isLoading: action.isLoading }, { noMore: action.noMore })
  },
  [INITIAL_REJECT]: (state, action) => {
    return Object.assign({}, state, { reject: [] })
  }
}
