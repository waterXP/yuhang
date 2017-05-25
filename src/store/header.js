export const UPDATE_TITLE = 'UPDATE_TITLE'
export const UPDATE_BTNS = 'UPDATE_BTNS'
export const UPDATE_HEADER = 'UPDATE_HEADER'

export function updateTitle (title) {
  return { type: UPDATE_TITLE, title }
}

export function updateBtns (btns) {
  return { type: UPDATE_BTNS, btns }
}

export function updateHeader (header) {
  return { type: UPDATE_HEADER, header }
}

export const actions = {
  updateTitle,
  updateBtns,
  updateHeader
}

const ACTION_HANDLERS = {
  [UPDATE_TITLE]: (header, action) => {
    return Object.assign({}, header, {
      title: action.title
    })
  },
  [UPDATE_BTNS]: (header, action) => {
    return Object.assign({}, header, {
      btns: action.btns
    })
  },
  [UPDATE_HEADER]: (header, action) => {
    return Object.assign({}, header, action.header)
  }
}

const initialState = {
  title: '费用系统手机版',
  btns: []
}

export default function headerReducer (state = initialState, action) {
  const handler = ACTION_HANDLERS[action.type]
  return handler ? handler(state, action) : state
}
