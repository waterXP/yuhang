import { asyncFetch, pageSize } from '@/lib/base'

export const GET_DRAFT = 'GET_DRAFT'
export const CLEAR_DRAFT = 'CLEAR_DRAFT'
export const IS_LOADING_DRAFT = 'IS_LOADING_DRAFT'
export const LOAD_MORE = 'LOAD_MORE'

export const getDraft = (cPage = 1, noMore = false) => {
  return asyncFetch(
    'get expensesClaims/myList.json',
    {
      current_page: cPage,
      statusVal: 0,
      pageSize: pageSize
    },
    (data, dispatch) => {
      return dispatch({
        type: GET_DRAFT,
        draft: data,
        isLoading: false,
        noMore: noMore,
        loadMore: false
      })
    }
  )
}

export const clearDraft = () => {
  return {
    type: CLEAR_DRAFT
  }
}

export const isLoading = (state) => {
  return {
    type:IS_LOADING_DRAFT
  }
}

export const deleteExp = (expensesClaimsId) => {
  return asyncFetch(
    'get expensesClaims/delete.json',
    { id: expensesClaimsId },
    (data, dispatch) => {
      dispatch(getDraft())
    }
  )
}
export const loadMore = () => {
  return {
    type: LOAD_MORE
  }
}

export const ACTION_HANDLERS = {
  [IS_LOADING_DRAFT]: (state) => {
    return Object.assign({}, state, { isLoading: true })
  },
  [GET_DRAFT]: (state, action) => {
    let approveList = state.draft.data
    if (!approveList) {
      approveList = []
    }
    if (action.draft.data) {
      action.draft.data = approveList.concat(action.draft.data)
    }
    return Object.assign({}, state, { draft: action.draft },
      { isLoading: action.isLoading }, { noMore: action.noMore }, { loadMore: action.loadMore })
  },
  [CLEAR_DRAFT]: (state, action) => {
    return Object.assign({}, state, { draft: [] })
  }
}
