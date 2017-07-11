// import { asyncFetch } from '../../../store/base'

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
//           data: getState().ApprovalFilter
//         })
//         resolve()
//       }, 200)
//     })
//   }
// }

// export const exampleFetch = (url) => {
//   return asyncFetch(
//     'get /expensesClaimPaids/paidHistory.json',
//     params,
//     (data, dispatch) => {
//       return dispatch({
//         type: EXAMPLE_FETCH,
//         data: data.data        
//       })
//     }
//   )
// }

// export const actions = {
  // exampleNormal,
  // exampleAsync,
  // exampleFetch
// }

// export const ACTION_HANDLERS = {
  // [EXAMPLE_NORMAL]: (state, action) => state,
  // [EXAMPLE_ASYNC]: (state, action) => state,
  // [EXANPLE_FETCH]: (state, action) => state,
  // [FETCH_FAIL]: fetchFail
// }

// const initialState = {}
// export default function (state = initialState, action) {
//  const handler = ACTION_HANDLERS[action.type]
//  return handler ? handler(state, action) : state
// }

