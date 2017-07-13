// import { asyncFetch } from '@/lib/base'
// import { getList, inBusy } from '../../Approval/modules/Approval'

// export { getList, inBusy }

// export const UPDATE_ACTIVE = 'UPDATE_ACTIVE'

// export const updateActive = (status) => {
//   return (dispatch, state) => {
//     dispatch(inBusy(true))
//     dispatch(getList(status))
//     return dispatch({
//       type: UPDATE_ACTIVE,
//       status
//     })
//   }
// }

// export const actions = {
//   updateActive
// }

// export const ACTION_HANDLERS = Object.assign({
//   [UPDATE_ACTIVE]: (state, action) => {
//     console.log(action)
//     return Object.assign({}, state, { active: action.status })
//   }
// })
