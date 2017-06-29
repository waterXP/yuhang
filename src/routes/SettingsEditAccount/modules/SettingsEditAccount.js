// import { fetchData, goLocation, toast } from '../../../lib/base'

// // export const GET_ACCOUNT_DETAIL = 'GET_ACCOUNT_DETAIL'

// // export const getAccountDetail = (id) => {
// //   return (dispatch, getState) => {
// //     fetchData('get /userAccounts/updateMyAccount.json', { id })
// //     .then((data) => {
// //       if (data.result === 0) {
// //         return dispatch({
// //           type: GET_ACCOUNT_DETAIL,
// //           account: data.data
// //         })
// //       } else {
// //         toast(data.msg)
// //       }
// //     })
// //   }
// // }

// export const updateAccount = (val) => {
//   return (dispatch, getState) => {
//     let action = 'post /userAccounts/saveMyAccount.json'
//     if (val.id) {
//       action = 'post /userAccounts/updateMyAccount.json' 
//     }    
//     fetchData(action, {
//       type: 1,
//       ...val
//     })
//     .then((data) => {
//       if (data.result === 0) {
//         goLocation({
//           pathname: '/settings/accounts'
//         })
//       } else {
//         toast(data.msg)
//       }
//     })
//   }
// }

// export const actions = {
//   // getAccountDetail,
//   updateAccount
// }

// export const ACTION_HANDLERS = {
//   // [GET_ACCOUNT_DETAIL]: (state, action) =>
//   //   Object.assign({}, state, {currentAccount: action.account})
// }
