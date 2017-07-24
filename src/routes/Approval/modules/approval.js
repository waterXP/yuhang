import { asyncFetch, fetchData, toast, FETCH_FAIL, dingSetTitle } from '@/lib/base'

export const GET_LIST = 'GET_LIST'
export const IN_BUSY = 'IN_BUSY'
export const UPDATE_ACTIVE = 'UPDATE_ACTIVE'
export const CLEAN_LIST = 'CLEAN_LIST'
export const GET_APPROVAL_DETAIL = 'GET_APPROVAL_DETAIL'
export const ADD_COMMENT = 'ADD_COMMENT'

const fetchApprovalDetail = (dispatch, id, type) => {
  let params = {
    expensesClaimsId: id,
    showAttachments: true
  }
  if (type) {
    params.type = type
  }
  fetchData('get /expensesClaimsView/approveDetail.json', params)
  .then((data) => {
    if (data.result === 0) {
      return dispatch({
        type: GET_APPROVAL_DETAIL,
        data: data.data
      })
    } else {
      toast(data.msg)
      return dispatch({
        type: FETCH_FAIL,
        err: data.msg || '系统忙，请稍后再试'
      })
    }
  }).catch((e) => {
    return dispatch({
      type: FETCH_FAIL,
      err: e
    })
  })
}

export const inBusy = (state) => {
  return {
    type: IN_BUSY,
    state
  }
}

export const getList = (status = 1, params = { current_page: 1 }) => {
  let action = 'get /expensesClaims/waitMeList.json'
  if (!params.current_page) {
    params.current_page = 1
  }
  dingSetTitle('待我审批')
  switch (status) {
    case 2:
      action = 'get /expensesClaims/myList.json'
      dingSetTitle('我发起的')
      break
    case 3:
      action = 'get /expensesClaims/myCCList.json'
      dingSetTitle('抄送我的')
      break
    case 4:
      action = 'get /expensesClaims/alreadyApprove.json'
      dingSetTitle('我已审批')
  }
  return asyncFetch(
    action,
    params,
    (data, dispatch) => {
      return dispatch({
        type: GET_LIST,
        addedList: data.data || [],
        page: data.page || {},
        status
      })
    }
  )
}

export const getApprovalDetail = (id, type) => {
  return (dispatch, getState) => {
    fetchApprovalDetail(dispatch, id, type)
  }
}

export const addComment = (expensesClaimId, remark, type) => {
  return (dispatch, getState) => {
    dispatch(inBusy(true))
    fetchData('post /expensesClaimComments/add.json', {
      expensesClaimId,
      remark
    }).then((data) => {
      if (data.result === 0) {
        fetchApprovalDetail(dispatch, expensesClaimId, type)
      } else {
        toast(data.msg)
      }
    })
  }
}

export const updateActive = (status) => {
  return (dispatch, state) => {
    dispatch(cleanList())
    dispatch(inBusy(true))
    dispatch(getList(status))
    return dispatch({
      type: UPDATE_ACTIVE,
      status
    })
  }
}

export const cleanList = () => {
  return {
    type: CLEAN_LIST
  }
}

export const actions = {
  getList,
  inBusy,
  updateActive,
  cleanList,
  getApprovalDetail,
  addComment
}

const ACTION_HANDLERS = Object.assign({}, {
  [IN_BUSY]: (state, action) =>
    Object.assign({}, state, { isBusy: action.state }),
  [GET_LIST]: (state, { addedList, page }) => {
    let list
    if (page.current_page === 1) {
      list = addedList
    } else {
      list = [...state.list, ...addedList]
    }
    return Object.assign({}, state, { list, isBusy: false, page })
  },
  [UPDATE_ACTIVE]: (state, action) =>
    Object.assign({}, state, { active: action.status }),
  [CLEAN_LIST]: (state, action) =>
    Object.assign({}, state, { list: [], page: {} }),
  [GET_APPROVAL_DETAIL]: (state, action) =>
    Object.assign({}, state, {
      approvalDetail: action.data,
      isBusy: false
    })
})

const initialState = {
  active: 1,
  list: [],
  page: {},
  isBusy: false,
  approvalDetail: {}
}

export default function (state = initialState, action) {
  const handler = ACTION_HANDLERS[action.type]
  return handler ? handler(state, action) : state
}
