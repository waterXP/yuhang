import { goLocation } from '@/lib/base'

export const LOGIN = 'LOGIN'
export const CLEAR_USER_INFO = 'CLEAR_USER_INFO'
export const REGISTER = 'REGISTER'
export const GET_VALIDATE = 'GET_VALIDATE'

export const login = (username, password) =>
  (dispatch, getState) => {
    dispatch({
      type: LOGIN,
      loginFail: false,
      userInfo: {
        username,
        password
      }
    })
    goLocation('/home')
  }
export const clearUserInfo = () => ({
  type: CLEAR_USER_INFO
})
export const register = (params) =>
  (dispatch, getState) => {
    dispatch({
      type: 'IN_BUSY',
      isBusy: true,
      step: 'loading-data'
    })
    // async fetch type here
    console.log(params)
    dispatch({ type: REGISTER })
    dispatch({
      type: 'IN_BUSY',
      isBusy: false,
      step: ''
    })
  }
export const getValidate = (callback) =>
  (dispatch, getState) => {
    // async fetch type here
    dispatch({ type: GET_VALIDATE })
    callback && callback()
  }

const ACTION_HANDLERS = Object.assign({}, {
  [LOGIN]: (state, { userInfo, loginFail }) =>
    Object.assign({}, state, {
      loginFail,
      userInfo
    }),
  [CLEAR_USER_INFO]: state =>
    Object.assign({}, state, {
      userInfo: {}
    }),
  [REGISTER]: (state, action) =>
    Object.assign({}, state, { wrongValidate: true }),
  [GET_VALIDATE]: state =>
    Object.assign({}, state, { wrongValidate: false })
})

const initialState = {
  loginFail: false,
  userInfo: {},
  wrongValidate: false
}

export default function (state = initialState, action) {
  const handler = ACTION_HANDLERS[action.type]
  return handler ? handler(state, action) : state
}
