import { settingsAccountsHandlers } from '../../SettingsAccounts/'
//import { settingsHistoryHandlers } from '../../SettingsHistory/'
import { settingsDateFilterHandlers } from '../../SettingsDateFilter/'
//import { settingsHistoryDetailHandlers } from '../../SettingsHistoryDetail'

const ACTION_HANDLERS = Object.assign(
  {},
  settingsAccountsHandlers,
  //settingsHistoryHandlers,
  settingsDateFilterHandlers,
  //settingsHistoryDetailHandlers
)

const initialState = {
  accounts: [],
  //paidHistory: [],
  filter: {},
  //historyDetail: {}
}
export default function (state = initialState, action) {
  const handler = ACTION_HANDLERS[action.type]
  return handler ? handler(state, action) : state
}

