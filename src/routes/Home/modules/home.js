import { HomeApproveDetail } from '../../HomeApproveDetail'
import { HomeHistoryHandlers } from '../../HomeHistory'
import { HomeHistoryDetailHandlers } from '../../HomeHistoryDetail'
import { HomeListHandlers } from '../../HomeList'
import { fetchData, toast } from '@/lib/base'

// export const IN_BUSY = 'IN_BUSY'

// export const inBusy = (state) => {
//   return {
//     type: IN_BUSY,
//     state
//   }
// }

// export const addComment = (expensesClaimId, remark, cb) => {
//   return (dispatch, getState) => {
//     dispatch(inBusy(true))
//     fetchData('post /expensesClaimComments/add.json', {
//       expensesClaimId,
//       remark
//     }).then((data) => {
//       if (data.result === 0) {
//         dispatch(inBusy(false))
//         cb && cb()
//       } else {
//         toast(data.msg)
//       }
//     })
//   }
// }

const ACTION_HANDLERS = Object.assign(
  {},
  // {
  //   [IN_BUSY]: (state, action) =>
  //     Object.assign({}, state, { isBusy: action.state }),
  // },
  HomeApproveDetail,
  HomeHistoryHandlers,
  HomeHistoryDetailHandlers,
  HomeListHandlers
)
const initialState = {
  approve: {
    cPage: 1,
    pageCount: 1
  },
  loadMore: false,
  noMore: false,
  approveSumMoney: 0,
  paidHistory: [],
  historyDetail: {},
  isLoading: true,
  isBusy: false,
  detail: {},
  cPage: 1,
  total_page: 1,
  filter: {},
  time: ''
}

export default function (state = initialState, action) {
  const handler = ACTION_HANDLERS[action.type]
  return handler ? handler(state, action) : state
}
