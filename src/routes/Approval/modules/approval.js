import { asyncFetch } from '@/lib/base'

export const GET_LIST = 'GET_LIST'
export const IN_BUSY = 'IN_BUSY'
export const UPDATE_ACTIVE = 'UPDATE_ACTIVE'
export const CLEAN_LIST = 'CLEAN_LIST'

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
        addedList: data.data || [],
        page: data.page || {}
      })
    }
  )
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
  cleanList
}

const ACTION_HANDLERS = Object.assign({}, {
  [IN_BUSY]: (state, action) =>
    Object.assign({}, state, { isBusy: action.state }),
  [GET_LIST]: (state, { addedList, page }) =>
    Object.assign({}, state, { list: [...state.list, ...addedList], isBusy: false, page }),
  [UPDATE_ACTIVE]: (state, action) =>
    Object.assign({}, state, { active: action.status }),
  [CLEAN_LIST]: (state, action) =>
    Object.assign({}, state, { list: [], page: {} })
})

const initialState = {
  active: 1,
  list: [],
  page: {},
  isBusy: false
}

export default function (state = initialState, action) {
  const handler = ACTION_HANDLERS[action.type]
  return handler ? handler(state, action) : state
}

