import asyncFetch from '@/lib/base'

export const SET_STEP = 'SET_STEP'
export const IN_BUSY = 'IN_BUSY'
export const TOAST = 'TOAST'
export const REMOVE_TOAST = 'REMOVE_TOAST'
export const SET_LANGUAGE = 'SET_LANGUAGE'
export const GET_LIST = 'GET_LIST'
export const CLEAR_LIST = 'CLEAR_LIST'

const duration = 2000
let nextToast = 1

export const setStep = (step = '') => ({
  type: SET_STEP,
  step
})
export const inBusy = (isBusy = true, step) => ({
  type: IN_BUSY,
  isBusy,
  step
})
export const toast = (style, text, title) =>
  (dispatch, getState) => {
    const key = nextToast++
    const tm = setTimeout(() => dispatch(removeToast(key)), duration)
    dispatch({
      type: TOAST,
      toast: {
        style: text === undefined ? 'error' : style,
        text: text === undefined ? style : text,
        title: title || ' ',
        key,
        tm
      }
    })
  }
export const closeToast = toast => {
  toast.tm && clearTimeout(toast.tm)
  return removeToast(toast.key)
}
const removeToast = (key) => ({
  type: REMOVE_TOAST,
  key
})
export const setLanguage = language => ({
  type: SET_LANGUAGE,
  language
})
export const getList = (action, params) => {
  const _params = {}
  for (let p in params) {
    if (params[p] === '') {
      delete params[p]
    } else {
      _params[p] = params[p]
    }
  }
  console.log(_params)
  // return asyncFetch(action, _params, (d, dispatch) => {
  //   return dispatch({
  //     type: GET_LIST,
  //     list: d.data,
  //     page: d.page,
  //     pageSize: d.pageSize,
  //     total: d.total
  //   })
  // })
  return {
      type: GET_LIST,
      list: [
        {
          id: 1,
          name: '张三',
          company: '张三公司',
          address: '3333',
          contact: 'a@bn.com',
          code: '99879879dfa',
          identity: '3333',
          mail: 'a@bn.com',
          phone: '13444458787',
          status: 0,
          time: +new Date()
        }
      ],
      page: _params.page,
      pageSize: _params.pageSize || 10,
      total: 77
  }
}
export const clearList = () => ({
  type: CLEAR_LIST
})

const ACTION_HANDLERS = {
  [SET_STEP]: (state, { step }) =>
    Object.assign({}, state, { step }),
  [IN_BUSY]: (state, { isBusy, step }) =>
    Object.assign(
      {}, state, {
        isBusy, step: step || ''
      }
    ),
  [TOAST]: (state, { toast }) => {
    return Object.assign(
      {}, state, {
        toasts: [...state.toasts, toast]
      }
    )
  },
  [REMOVE_TOAST]: (state, { key }) => {
    const index = state.toasts.findIndex(v => v.key === key)
    if (~index) {
      let _toasts = [...state.toasts]
      _toasts.splice(index, 1)
      return Object.assign(
        {}, state, {
          toasts: _toasts
        })
    }
    return state
  },
  [SET_LANGUAGE]: (state, { language }) =>
    Object.assign({}, state, { language }),
  [GET_LIST]: (state, { list, page, pageSize, total }) =>
    Object.assign({}, state, { list, page, pageSize, total }),
  [CLEAR_LIST]: state =>
    Object.assign({}, state, {
      list: [],
      page: 1,
      pageSize: 10,
      total: 0
    })
}

const initialState = {
  step: '',
  isBusy: false,
  alipaySwitch: 0,
  toasts: [],
  language: 'ch',
  list: [],
  page: 1,
  pageSize: 10,
  total: 0
}

export default function (state = initialState, action) {
  const handler = ACTION_HANDLERS[action.type]
  return handler ? handler(state, action) : state
}
