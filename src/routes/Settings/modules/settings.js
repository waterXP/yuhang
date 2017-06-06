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
//           data: getState().settings
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
//         data: getState().settings
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

const initialState = {
  /* ** test data ** */
  accounts: [{
    "bankCode": "893",
    "isDefault": 0,
    "bankBranchName": "西湖支行",     // 收款银行支行名称
    "name": "沈龙飞",
    "mobile": "13558231131",
    "bankName": "招商银行",           // 收款银行名称
    "id": 1,                          // id
    "type": 1,                      // 1银行卡   2 支付宝
    "userName": "liam",             // 员工姓名
    "account": "4387298933324438721111"        // 收款账号
  }, {
    "bankCode": "893",
    "isDefault": 0,
    "bankBranchName": "西湖支行",
    "name": "刘松",
    "mobile": "13558231131",
    "bankName": "杭州银行",
    "id": 2,
    "type": 1,
    "userName": "liam",
    "account": "wwwmmm@sina.com"
  }],
  currentAccount: {}
}
export default function (state = initialState, action) {
  const handler = ACTION_HANDLERS[action.type]
  return handler ? handler(state, action) : state
}

