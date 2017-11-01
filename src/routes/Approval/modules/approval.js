import { asyncFetch, fetchData, FETCH_FAIL } from '@/lib/base'
import { toast } from '@/lib/ddApi'

export const GET_LIST = 'GET_LIST'
export const IN_BUSY = 'IN_BUSY'
export const UPDATE_ACTIVE = 'UPDATE_ACTIVE'
export const CLEAN_LIST = 'CLEAN_LIST'
export const GET_APPROVAL_DETAIL = 'GET_APPROVAL_DETAIL'
export const ADD_COMMENT = 'ADD_COMMENT'
export const SET_FILTER = 'SET_FILTER'
export const CLEAN_FILTER = 'CLEAN_FILTER'
export const DELETE_EXP = 'DELETE_EXP'

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
  switch (status) {
    case 2:
      action = 'get /expensesClaims/myList.json'
      params.isPhone = 1
      break
    case 3:
      action = 'get /expensesClaims/myCCList.json'
      break
    case 4:
      action = 'get /expensesClaims/alreadyApprove.json'
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

export const setFilter = (filter = [], range = ['', '']) => ({
  type: SET_FILTER,
  filter,
  range
})

export const cleanFilter = () => ({
  type: CLEAN_FILTER
})

export const deleteExp = (expensesClaimsId, type) => {
  return asyncFetch(
    'get expensesClaims/delete.json',
    { id: expensesClaimsId },
    (data, dispatch) => {
      window.history.back()
      // let url = {
      //   pathname:'/home/list',
      //   query: {
      //     type: type
      //   }
      // }
      // goLocation(url)
    }
  )
}

export const actions = {
  getList,
  inBusy,
  updateActive,
  cleanList,
  getApprovalDetail,
  addComment,
  deleteExp
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
    }),
  [SET_FILTER]: (state, { filter, range }) =>
    Object.assign({}, state, { filter, range }),
  [CLEAN_FILTER]: (state, action) =>
    Object.assign({}, state, { filter: [], range: ['', ''] })
})

const initialState = {
  active: 1,
  list: [],
  page: {},
  isBusy: false,
  approvalDetail: {},
  range: ['', ''],
  filter: []
}

export default function (state = initialState, action) {
  const handler = ACTION_HANDLERS[action.type]
  return handler ? handler(state, action) : state
}
