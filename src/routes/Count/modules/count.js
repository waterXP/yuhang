// import { fetchData, fetchFail, FETCH_FAIL } from '../../../store/base'

// export const EXAMPLE_NORMAL = 'EXAMPLE_NORMAL'
// export const EXAMPLE_ASYNC = 'EXAMPLE_ASYNC'
// export const EXANPLE_FETCH = 'EXANPLE_FETCH'

// export function exampleNormal (value = 1) {
//   return {
//     type: EXAMPLE_NORMAL,
//     value: value
//   }
// }

// export const exampleAsync = () => {
//   return (dispatch, getState) => {
//     return new Promise((resolve) => {
//       setTimeout(() => {
//         dispatch({
//           type: EXAMPLE_ASYNC,
//           data: getState().count
//         })
//         resolve()
//       }, 200)
//     })
//   }
// }

// export const exampleFetch = (url) => {
//   return (dispatch, getState) => {
//     fetchData('get /api/test')
//     .then((data) => {
//       return dispatch({
//         type: EXANPLE_FETCH,
//         data: getState().count
//       })
//     })
//     .catch((e) => {
//       return dispatch({
//         type: FETCH_FAIL,
//         err: e
//       })
//     })
//   }
// }

export const actions = {
  // exampleNormal,
  // exampleAsync,
  // exampleFetch
}

const ACTION_HANDLERS = {
  // [EXAMPLE_NORMAL]    : (state, action) => state,
  // [EXAMPLE_ASYNC] : (state, action) => state,
  // [EXANPLE_FETCH]
  // [FETCH_FAIL]: fetchFail
}

const initialState = {}
export default function (state = initialState, action) {
  const handler = ACTION_HANDLERS[action.type]
  return handler ? handler(state, action) : state
}

