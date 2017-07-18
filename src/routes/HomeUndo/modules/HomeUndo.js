import { asyncFetch, pageSize } from '@/lib/base'

export const GET_UNDO = 'GET_UNDO'
export const INITIAL_UNDO = 'INITIAL_UNDO'
export const IS_LOADING_UNDO = 'IS_LOADING_UNDO'
export const LOAD_MORE = 'LOAD_MORE'

export const getUndo = (cPage = 1, noMore = false) => {
  return asyncFetch(
    'get expensesClaims/myList.json',
    {
      current_page:cPage,
      statusVal:2,
      pageSize:pageSize
    },
    (data, dispatch) => {
      return dispatch({
        type: GET_UNDO,
        undo: data,
        isLoading:false,
        noMore:noMore
      })
    }
  )
}

export const initialUndo = () => {
  return { type: INITIAL_UNDO }
}
export const isLoading = () => {
  return { type:IS_LOADING_UNDO }
}
export const loadMore = () => {
  return { type:LOAD_MORE }
}
export const deleteExp = (expensesClaimsId) => {
  return asyncFetch(
    'get expensesClaims/delete.json',
    { id:expensesClaimsId },
    (data, dispatch) => {
      dispatch(getUndo())
    }
  )
}

export const actions = {
  getUndo,
  initialUndo
}

export const ACTION_HANDLERS = {
  [IS_LOADING_UNDO]: (state, action) => {
    return Object.assign({}, state, { isLoading: true })
  },
  [GET_UNDO]: (state, action) => {
    let approveList = state.undo.data
    if (!approveList) {
      approveList = []
    }
    if (action.undo.data) {
      action.undo.list = approveList.concat(action.undo.list)
    }
    return Object.assign({}, state, { undo: action.undo },
      { isLoading: action.isLoading }, { noMore: action.noMore })
  },
  [INITIAL_UNDO]: (state, action) => {
    return Object.assign({}, state, { undo: {} })
  }
}
