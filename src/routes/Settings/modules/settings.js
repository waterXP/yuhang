import { settingsAccountsHandlers } from '../../SettingsAccounts/'
import { settingsHistoryHandlers } from '../../SettingsHistory/'
// import { settingsEditAccountHandlers } from '../../SettingsEditAccount/'
// import { settingsEditAlipayHandlers } from '../../SettingsEditAlipay/'

const ACTION_HANDLERS = Object.assign(
  {},
  settingsAccountsHandlers,
  // settingsEditAccountHandlers,
  // settingsEditAlipayHandlers
)

const initialState = {
  accounts: []
  // currentAccount: {}
}
export default function (state = initialState, action) {
  const handler = ACTION_HANDLERS[action.type]
  return handler ? handler(state, action) : state
}

