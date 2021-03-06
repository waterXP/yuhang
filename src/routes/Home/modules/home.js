// import { fetchData } from '@/lib/base'

const ACTION_HANDLERS = {}

const initialState = {
}

export default function (state = initialState, action) {
  const handler = ACTION_HANDLERS[action.type]
  return handler ? handler(state, action) : state
}
