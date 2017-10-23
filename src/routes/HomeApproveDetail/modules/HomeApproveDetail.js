import { asyncFetch, goLocation, fetchData, toast } from '@/lib/base'

export const GET_APPROVE_DETAIL = 'GET_APPROVE_DETAIL'
export const INITIAL_APPROVE_DETAIL = 'INITIAL_APPROVE_DETAIL'
export const DELETE_EXP = 'DELETE_EXP'
export const DETAIL_LOADING = 'DETAIL_LOADING'
export const IS_BUSY = 'IS_BUSY'
export const IN_BUSY = 'IN_BUSY'

export const getApproveDetail = (expensesClaimsId = 1, detailType) => {
  let params = {}
  if (detailType) {
    params = {
      expensesClaimsId: expensesClaimsId,
      type: 'afterApproval',
      showAttachments: true,
      isRead: true
    }
  } else {
    params = {
      expensesClaimsId: expensesClaimsId
    }
  }
  return asyncFetch(
    'get expensesClaimsView/approveDetail.json',
    params,
    (data, dispatch) => {
      return dispatch({
        type: GET_APPROVE_DETAIL,
        detail: data.data,
        isLoading: false,
        isBusy: false
      })
    }
  )
}

export const initialApproveDetail = () => {
  return {
    type: INITIAL_APPROVE_DETAIL
  }
}

export const deleteExp = (expensesClaimsId, type) => {
  return asyncFetch(
    'get expensesClaims/delete.json',
    { id: expensesClaimsId },
    (data, dispatch) => {
      window.history.back()
    }
  )
}

export const detailLoading = () => {
  return {
    type: DETAIL_LOADING
  }
}

export const isBusyFun = (dispatch) => {
  return dispatch({
    type: IS_BUSY,
    isBusy: true
  })
}

export const inBusy = (state) => {
  return {
    type: IN_BUSY,
    state
  }
}

export const addComment = (expensesClaimId, remark, cb) => {
  return (dispatch, getState) => {
    dispatch(inBusy(true))
    fetchData('post /expensesClaimComments/add.json', {
      expensesClaimId,
      remark
    }).then((data) => {
      if (data.result === 0) {
        dispatch(inBusy(false))
        cb && cb()
      } else {
        toast(data.msg)
      }
    })
  }
}

export const ACTION_HANDLERS = {
  [IN_BUSY]: (state, action) =>
    Object.assign({}, state, { isBusy: action.state }),
  [GET_APPROVE_DETAIL]: (state, action) => {
    return Object.assign({}, state, {
      detail: action.detail,
      isLoading: action.isLoading,
      isBusy: action.isBusy
    })
  },
  [INITIAL_APPROVE_DETAIL]: (state, action) => {
    return Object.assign({}, state, { detail: {}, isLoading: false, isBusy: false })
  },
  [DETAIL_LOADING]: (state, action) => {
    return Object.assign({}, state, { isLoading: true })
  },
  [IS_BUSY]: (state, action) => {
    return Object.assign({}, state, { isBusy: action.isBusy })
  }
}
