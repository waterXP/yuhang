import { settingsAccountsHandlers } from '../../SettingsAccounts/'
import { settingsEditAccountHandlers } from '../../SettingsEditAccount/'

const ACTION_HANDLERS = Object.assign(
  {},
  settingsAccountsHandlers,
  settingsEditAccountHandlers
)

const initialState = {
  accounts: [],
  currentAccount: {}
}
export default function (state = initialState, action) {
  const handler = ACTION_HANDLERS[action.type]
  return handler ? handler(state, action) : state
}

