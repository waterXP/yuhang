export const ADUIT = 'ADUIT'

export const audit = (id) => {
  return { type: ADUIT }
  // return asyncFetch('...', { id }, (d, dispatch) =>
  //   dispatch({ type: ADUIT })
  // )
}

const ACTION_HANDLERS = {
  [ADUIT]: state => state
}

const initialState = {
}

export default function (state = initialState, action) {
  const handler = ACTION_HANDLERS[action.type]
  return handler ? handler(state, action) : state
}
