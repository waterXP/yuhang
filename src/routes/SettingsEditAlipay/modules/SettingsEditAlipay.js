// import { fetchData, goLocation, toast } from '../../../store/base'

// export const updateAccount = (val) => {
//   return (dispatch, getState) => {
//     let action = 'post /userAccounts/saveMyAccount.json'
//     if (val.id) {
//       action = 'post /userAccounts/updateMyAccount.json' 
//     }
//     fetchData(action, {
//       type: 2,
//       bankName: '支付宝',
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
//   updateAccount
// }

// export const ACTION_HANDLERS = {}
