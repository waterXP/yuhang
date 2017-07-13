/*import { settingsAccountsHandlers } from '../../SettingsAccounts/'
import { settingsHistoryHandlers } from '../../SettingsHistory/'
import { settingsDateFilterHandlers } from '../../SettingsDateFilter/'
import { settingsHistoryDetailHandlers } from '../../SettingsHistoryDetail'

const ACTION_HANDLERS = Object.assign(
  {},
  settingsAccountsHandlers,
  settingsHistoryHandlers,
  settingsDateFilterHandlers,
  settingsHistoryDetailHandlers
)

const initialState = {
  accounts: [],
  paidHistory: [],
  filter: {},
  historyDetail: {}
}
export default function (state = initialState, action) {
  const handler = ACTION_HANDLERS[action.type]
  return handler ? handler(state, action) : state
}*/
import {HomeApproveList} from '../../HomeApproveList'
import {HomeNotPaidList} from "../../HomeNotPaid"
import {HomeReject} from "../../HomeReject"
import {HomeDraft} from "../../HomeDraft"
import {HomeUndo} from "../../HomeUndo"
import {HomeApproveDetail} from "../../HomeApproveDetail"
import { settingsHistoryHandlers } from '../../SettingsHistory'
import { settingsHistoryDetailHandlers } from '../../SettingsHistoryDetail'

const ACTION_HANDLERS = Object.assign(
  {},
  HomeApproveList,
  HomeNotPaidList,
  HomeReject,
  HomeDraft,
  HomeUndo,
  HomeApproveDetail,
  settingsHistoryHandlers,
  settingsHistoryDetailHandlers
)
const initialState = {
  accounts: [],
  paidHistory: [],
  historyDetail: {}
}
export default function(state=initialState,action){
  const handler=ACTION_HANDLERS[action.type]
  return handler ? handler(state, action) : state
}
