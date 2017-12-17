import { goLocation } from '@/lib/base'

export const LOGIN = 'LOGIN'
export const CLEAR_USER_INFO = 'CLEAR_USER_INFO'
export const REGISTER = 'REGISTER'
export const GET_VALIDATE = 'GET_VALIDATE'
export const SET_FORGET_ACCOUNT = 'SET_FORGET_ACCOUNT'
export const SET_VALIDATE = 'SET_VALIDATE'
export const SET_NEW_PASSWORD = 'SET_NEW_PASSWORD'

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
export const register = (params, callback) =>
  (dispatch, getState) => {
    dispatch({
      type: 'IN_BUSY',
      isBusy: true,
      step: 'loading-data'
    })
    // async fetch type here
    console.log(params)
    if (params.mail) {
      dispatch({ type: setForgetAccount , account: params.mail})
    }
    dispatch({ type: REGISTER })
    dispatch({
      type: 'IN_BUSY',
      isBusy: false,
      step: ''
    })
    callback && callback()
  }
export const getValidate = (callback) =>
  (dispatch, getState) => {
    // async fetch type here
    dispatch({ type: GET_VALIDATE })
    callback && callback()
  }
export const setForgetAccount = (account = '') => ({
  type: SET_FORGET_ACCOUNT,
  account
})
export const setValidate = (callback) =>
  (dispatch, getState) => {
    // async fetch type here
    dispatch({ type: SET_VALIDATE })
    // result is correct or fail
    callback && callback(true)
  }
export const setNewPassword = (callback) =>
  (dispatch, getState) => {
    dispatch({ type: SET_NEW_PASSWORD })
    // result is correct or fail
    callback && callback(true)
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
    Object.assign({}, state, { wrongValidate: false }),
  [SET_FORGET_ACCOUNT]: (state, { account }) =>
    Object.assign({}, state, { account }),
  [SET_VALIDATE]: state => state,
  [SET_NEW_PASSWORD]: state => state
})

const initialState = {
  loginFail: false,
  userInfo: {},
  wrongValidate: false,
  account: '13333333333'
}

export default function (state = initialState, action) {
  const handler = ACTION_HANDLERS[action.type]
  return handler ? handler(state, action) : state
}
