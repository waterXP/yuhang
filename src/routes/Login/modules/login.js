import {
  // goLocation,
  asyncFetch
} from '@/lib/base'

export const LOGIN = 'LOGIN'
export const LOGOUT = 'LOGOUT'
export const CLEAR_USER_INFO = 'CLEAR_USER_INFO'
export const REGISTER = 'REGISTER'
export const GET_VALIDATE = 'GET_VALIDATE'
export const SET_FORGET_ACCOUNT = 'SET_FORGET_ACCOUNT'
export const SET_VALIDATE = 'SET_VALIDATE'
export const SET_NEW_PASSWORD = 'SET_NEW_PASSWORD'
export const SHOW_VCODE = 'SHOW_VCODE'
export const CHECK_CODE = 'CHECK_CODE'

export const login = (params) =>
  asyncFetch(
    'post /login',
    params,
    (d, dispatch) => {
      dispatch({
        type: 'SET_USER_INFO',
        userInfo: {
          username: params.username
        }
      })
      dispatch({
        type: LOGIN,
        loginFail: false,
        userInfo: {
          username: params.username
        }
      })
    },
    (d, dispatch, getState) => {
      if (d.code === 20708 && d.data) {
        const isShowCode = getState().root.isShowCode
        if (isShowCode !== !!d.data.isShowVCode) {
          dispatch({
            type: SHOW_VCODE,
            isShowCode: !isShowCode
          })
        }
      }
    }
  )
export const logout = (callback) =>
  asyncFetch(
    'get /logout',
    {},
    (d, dispatch) => {
      dispatch({ type: LOGOUT })
      dispatch({
        type: 'SET_USER_INFO',
        userInfo: {}
      })
      callback && callback()
    },
    undefined,
    true
  )
export const clearUserInfo = () => ({
  type: CLEAR_USER_INFO
})
export const register = (params, callback) =>
  asyncFetch(
    'post /sign-up',
    params,
    (d, dispatch) => {
      dispatch({ type: REGISTER })
      callback && callback()
    },
    undefined,
    true
  )
export const getValidate = (action, params, callback) =>
  asyncFetch(
    action,
    params,
    (d, dispatch) => {
      dispatch({ type: GET_VALIDATE })
      callback && callback()
    }
  )

export const setForgetAccount = (account = '') => ({
  type: SET_FORGET_ACCOUNT,
  account
})
export const setValidate = (params, callback, callbackError) =>
  asyncFetch(
    'get /vcode/validate-phone',
    params,
    (d, dispatch) => {
      dispatch({ type: SET_VALIDATE })
      callback && callback()
    },
    (d, dispatch) => {
      callbackError && callbackError()
    }
  )
  // (dispatch, getState) => {
  //   dispatch({
  //     type: 'IN_BUSY',
  //     isBusy: true,
  //     step: 'set-validate'
  //   })
  //   // async fetch type here
  //   dispatch({ type: SET_VALIDATE })
  //   // result is correct or fail
  //   dispatch({
  //     type: 'IN_BUSY',
  //     isBusy: false,
  //     step: ''
  //   })
  //   callback && callback(true)
  // }
export const setNewPassword = (params, callback, callbackError) =>
  asyncFetch(
    'post /user/reset-pwd',
    params,
    (d, dispatch) => {
      dispatch({ type: SET_NEW_PASSWORD })
      callback && callback()
    },
    (d, dispatch) => {
      callbackError && callbackError()
    },
    true
  )
  // (dispatch, getState) => {
  //   dispatch({
  //     type: 'IN_BUSY',
  //     isBusy: true,
  //     step: 'set-new-password'
  //   })
  //   dispatch({ type: SET_NEW_PASSWORD })
  //   dispatch({
  //     type: 'IN_BUSY',
  //     isBusy: false,
  //     step: ''
  //   })
  //   // result is correct or fail
  //   callback && callback(true)
  // }
export const checkCode = (params, callback, callbackError) =>
  asyncFetch(
    'post /vcode/validate-email',
    params,
    (d, dispatch) => {
      dispatch({ type: CHECK_CODE })
      callback && callback()
    },
    (d, dispatch) => {
      callbackError && callbackError()
    },
    true
  )

const ACTION_HANDLERS = Object.assign({}, {
  [LOGIN]: (state, { userInfo, loginFail }) =>
    Object.assign({}, state, {
      loginFail,
      userInfo
    }),
  [LOGOUT]: state =>
    Object.assign({}, state, { userInfo: {} }),
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
  [SET_NEW_PASSWORD]: state => state,
  [SHOW_VCODE]: (state, { isShowCode }) =>
    Object.assign({}, state, { isShowCode }),
  [CHECK_CODE]: state => state
})

const initialState = {
  loginFail: false,
  isShowCode: false,
  userInfo: {},
  wrongValidate: false,
  account: ''
}

export default function (state = initialState, action) {
  const handler = ACTION_HANDLERS[action.type]
  return handler ? handler(state, action) : state
}
