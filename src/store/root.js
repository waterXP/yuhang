export const SET_STEP = 'SET_STEP'
export const IN_BUSY = 'IN_BUSY'
export const TOAST = 'TOAST'
export const REMOVE_TOAST = 'REMOVE_TOAST'
export const SET_LANGUAGE = 'SET_LANGUAGE'

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
    Object.assign({}, state, { language })
}

const initialState = {
  step: '',
  isBusy: false,
  alipaySwitch: 0,
  toasts: [],
  language: 'ch'
}

export default function (state = initialState, action) {
  const handler = ACTION_HANDLERS[action.type]
  return handler ? handler(state, action) : state
}
