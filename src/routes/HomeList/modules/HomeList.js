import { asyncFetch, pageSize } from '@/lib/base'
import { dingShowPreLoad, dingHidePreLoad } from '@/lib/ddApi'

export const GET_APPROVE = 'GET_APPROVE'
export const INITIAL_APPROVE = 'INITIAL_APPROVE'
export const GET_APPROVE_SUMMONEY = 'GET_APPROVE_SUMMONEY'
export const IS_LOADING = 'IS_LOADING'
export const NOMORE = 'NOMORE'
export const GET_OFFSET_HEIGHT = 'GET_OFFSET_HEIGHT'
export const LOAD_MORE = 'LOAD_MORE'
export const DELETE_EXP = 'DELETE_EXP'

export const getApproveList = (cPage = 1, type = 1) => {
  let params = {
    current_page: cPage,
    pageSize: pageSize
  }
  let url = ''
  switch (type) {
    case 1 :
      url = 'get /expensesClaimsMobile/approveList.json'
      break
    case 2 :
      url = 'get /expensesClaimsMobile/waitPaidList.json'
      break
    case 4 :
      url = 'get /expensesClaims/draftList.json'
      params.status = 2
      break
    case 5 :
      url = 'get /expensesClaims/myList.json'
      params.statusVal = 3
      // params.type = 'allReject'
      break
    case 6 :
      url = 'get /expensesClaims/draftList.json'
      params.status = 0
      break
    default :
      return
  }
  return asyncFetch(
    url,
    params,
    (data, dispatch) => {
      let dataCell = {}
      if (type === 1 || type === 2) {
        dataCell = data.data
        if (dataCell) {
          dataCell.cPage = cPage
        }
      } else if (type === 4 || type === 5 || type === 6) {
        dataCell.list = data.data
        dataCell.cPage = cPage
        dataCell.pageCount = data.page ? data.page.total_page : 0
      }
      return dispatch({
        type: GET_APPROVE,
        approve: dataCell,
        isLoading: false,
        loadMore: false
      })
    }
  )
}
export const getSumMoney = (type = 1) => {
  return asyncFetch(
    'get /expensesClaimsMobile/getSumMoney.json',
    { type: type },
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

export const deleteExpCell = (expensesClaimsId) => {
  return {
    type: DELETE_EXP,
    expensesClaimsId: expensesClaimsId
  }
}

export const deleteExp = (expensesClaimsId) => {
  dingShowPreLoad()
  return asyncFetch(
    'get expensesClaims/delete.json',
    {
      id: expensesClaimsId
    },
    (data, dispatch) => {
      dingHidePreLoad()
      dispatch(deleteExpCell(expensesClaimsId))
    }
  )
}

export const actions = {
  getApproveList,
  initialApprove,
  getSumMoney,
  isLoading
}

export const ACTION_HANDLERS = {
  [IS_LOADING]: (state) => {
    return Object.assign({}, state, { isLoading: true, approve: { cPage:1, pageCount:1 } })
  },
  [GET_APPROVE]: (state, action) => {
    let approveList = state.approve ? state.approve.list : []
    if (!approveList) {
      approveList = []
    }
    if (action.approve && action.approve.list) {
      action.approve.list = approveList.concat(action.approve.list)
    }
    return Object.assign({}, state, {
      approve: action.approve,
      isLoading: action.isLoading,
      loadMore: action.loadMore
    })
  },
  [DELETE_EXP]: (state, action) => {
    let expensesClaimsId = action.expensesClaimsId
    let approveList = []
    let approve = state.approve
    if (approve) {
      approveList = approve.list
    }
    let approveListLength = approveList.length
    for (var i = 0; i < approveListLength; i++) {
      if (approveList[i].expensesClaimsId === expensesClaimsId) {
        approveList.splice(i, 1)
        approve.list = approveList
        break
      }
    }
    return Object.assign({}, state, { approve: approve })
  },
  [GET_APPROVE_SUMMONEY]: (state, action) => {
    return Object.assign({}, state, { approveSumMoney: action.approveSumMoney })
  },
  [INITIAL_APPROVE]: (state, action) => {
    return Object.assign({}, state, { approve: { cPage:1, pageCount:1 } })
  },
  [GET_OFFSET_HEIGHT]: (state, action) => {
    return Object.assign({}, state, { offsetHeight: action.offsetHeight })
  },
  [LOAD_MORE]: (state, action) => {
    return Object.assign({}, state, { loadMore: true })
  }
}
