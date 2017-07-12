import { asyncFetch } from '@/lib/base'
// import { approvalMainHandlers } from '../../ApprovalMain/'
// console.log(approvalMainHandlers)
// import { xx } from '../../ApprovalMain/modules/ApprovalMain'
// console.log(xx)

export const GET_LIST = 'GET_LIST'
export const IN_BUSY = 'IN_BUSY'
export const UPDATE_ACTIVE = 'UPDATE_ACTIVE'

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
        list: data.data || []
      })
    }
  )
}

export const updateActive = (status) => {
  return (dispatch, state) => {
    dispatch(inBusy(true))
    dispatch(getList(status))
    return dispatch({
      type: UPDATE_ACTIVE,
      status
    })
  }
}

export const actions = {
  getList,
  inBusy,
  updateActive
}

const ACTION_HANDLERS = Object.assign({}, {
  [IN_BUSY]: (state, action) =>
    Object.assign({}, state, { isBusy: action.state }),
  [GET_LIST]: (state, { list }) =>
    Object.assign({}, state, { list, isBusy: false }),
  [UPDATE_ACTIVE]: (state, action) =>
    Object.assign({}, state, { active: action.status })
})
// , approvalMainHandlers)

const initialState = {
  active: 1,
  list: [],
  isBusy: false
}

export default function (state = initialState, action) {
  const handler = ACTION_HANDLERS[action.type]
  return handler ? handler(state, action) : state
}

