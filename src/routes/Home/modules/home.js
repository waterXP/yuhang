import { HomeApproveList } from '../../HomeApproveList'
import { HomeNotPaidList } from '../../HomeNotPaid'
import { HomeReject } from '../../HomeReject'
import { HomeDraft } from '../../HomeDraft'
import { HomeUndo } from '../../HomeUndo'
import { HomeApproveDetail } from '../../HomeApproveDetail'
import { HomeHistoryHandlers } from '../../HomeHistory'
import { HomeHistoryDetailHandlers } from '../../HomeHistoryDetail'
import { HomeDateFilterHandlers } from '../../HomeDateFilter'

const ACTION_HANDLERS = Object.assign(
  {},
  HomeApproveList,
  HomeNotPaidList,
  HomeReject,
  HomeDraft,
  HomeUndo,
  HomeApproveDetail,
  HomeHistoryHandlers,
  HomeHistoryDetailHandlers,
  HomeDateFilterHandlers
)
const initialState = {
  approve: {},
  loadMore: false,
  noMore: false,
  approveSumMoney: 0,
  notPaid: { data: { list: [] } },
  reject:{ data:[] },
  undo:{ data:[] },
  draft:{ data:[] },
  paidHistory: [],
  historyDetail: {},
  isLoading: true,
  filter: {},
  monthFilter: [
    { id: 0, text: '1月' },
    { id: 1, text: '2月' },
    { id: 2, text: '3月' },
    { id: 3, text: '4月' },
    { id: 4, text: '5月' },
    { id: 5, text: '6月' },
    { id: 6, text: '7月' },
    { id: 7, text: '8月' },
    { id: 8, text: '9月' },
    { id: 9, text: '10月' },
    { id: 10, text: '11月' },
    { id: 11, text: '12月' }
  ]
}

export default function (state = initialState, action) {
  const handler = ACTION_HANDLERS[action.type]
  return handler ? handler(state, action) : state
}
