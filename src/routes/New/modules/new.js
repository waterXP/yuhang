export const SAVE_DATA = 'SAVA_DATA'

export const saveData = (data) => {
  return {
    type: SAVE_DATA,
    data: data
  }
}

export const actions = {
  saveData
}

const ACTION_HANDLERS = {
  [SAVE_DATA]: (state, action) =>
    Object.assign({}, state, { data: action.data })
}

const initialState = {}
export default function (state = initialState, action) {
  const handler = ACTION_HANDLERS[action.type]
  return handler ? handler(state, action) : state
}
