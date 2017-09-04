import { settingsAccountsHandlers } from '../../SettingsAccounts/'

export const SET_STEP = 'SET_STEP'

export const setStep = (step) => {
  return {
    type: SET_STEP,
    step
  }
}

export const actions = {
  setStep
}

const ACTION_HANDLERS = Object.assign(
  {
    [SET_STEP]: (state, { step }) =>
      Object.assign({}, state, { step })
  },
  settingsAccountsHandlers
)

const initialState = {
  accounts: [],
  filter: {},
  historyDetail: {},
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
  ],
  step: ''
}

export default function (state = initialState, action) {
  const handler = ACTION_HANDLERS[action.type]
  return handler ? handler(state, action) : state
}
