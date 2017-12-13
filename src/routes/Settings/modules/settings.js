import { asyncFetch } from '@/lib/base'
import { settingsAccountsHandlers } from '../../SettingsAccounts/'

export const SET_STEP = 'SET_STEP'
export const GET_USER_INFO = 'GET_USER_INFO'
export const GET_BANK_BRANCHS = 'GET_BANK_BRANCHS'
// export const SET_CURRENT_BANK_BRANCH_INFO = 'SET_CURRENT_BANK_BRANCH_INFO'
export const GET_BANK_INFO = 'GET_BANK_INFO'
export const CLEAR_BANK_BRANCHS = 'CLEAR_BANK_BRANCHS'
export const CLEAR_BANK_INFO = 'CLEAR_BANK_INFO'

export const setStep = step => {
  return {
    type: SET_STEP,
    step
  }
}
export const getUserInfo = () => {
  return asyncFetch(
    'get /users/loginUserMsg.json',
    {},
    (d, dispatch) => {
      return dispatch({
        type: GET_USER_INFO,
        userInfo: d.data
      })
    })
}
export const clearBankBranchs = () => ({
  type: CLEAR_BANK_BRANCHS
})
export const getBankBranchs = (params, callback) => {
  return asyncFetch(
    'get /bankBranch/getBankBranchByDistrict.json',
    params,
    (d, dispatch) => {
      callback && callback()
      return dispatch({
        type: GET_BANK_BRANCHS,
        bankBranchs: d.data
      })
    }
  )
}
// export const setCurrentBankBranchInfo = (currentBankCode, currentBankBranchName) => ({
//   type: SET_CURRENT_BANK_BRANCH_INFO,
//   currentBankCode: currentBankCode || '',
//   currentBankBranchName: currentBankBranchName || ''
// })
export const getBankInfo = (id, callback) =>
  asyncFetch(
    'get /userAccounts/updateMyAccount.json',
    { id },
    ({ data }, dispatch) => {
      let _d = Object.assign({}, data, {
        oldAccount: data.account,
        oldSeAccount: data.seAccount,
        defaultCard: data.isDefault,
        accountEdited: false
      })
      callback && callback(_d)
      return dispatch({
        type: GET_BANK_INFO,
        bankInfo: _d
      })
    }
  )
export const clearBankInfo = () => ({
  type: CLEAR_BANK_INFO
})

export const actions = {
  setStep,
  getUserInfo,
  getBankBranchs,
  // setCurrentBankBranchInfo,
  getBankInfo,
  clearBankInfo
}

const ACTION_HANDLERS = Object.assign(
  {
    [SET_STEP]: (state, { step }) =>
      Object.assign({}, state, { step }),
    [GET_USER_INFO]: (state, { userInfo }) =>
      Object.assign({}, state, { userInfo }),
    [CLEAR_BANK_BRANCHS]: state =>
      Object.assign({}, state, { bankBranchs: {} }),
    [GET_BANK_BRANCHS]: (state, { bankBranchs }) =>
      Object.assign({}, state, { bankBranchs }),
    // [SET_CURRENT_BANK_BRANCH_INFO]: (state, { currentBankCode, currentBankBranchName }) =>
    //   Object.assign({}, state, { currentBankCode, currentBankBranchName }),
    [GET_BANK_INFO]: (state, { bankInfo }) =>
      Object.assign({}, state, { bankInfo }),
    [CLEAR_BANK_INFO]: state =>
      Object.assign({}, state, { bankInfo: {} })
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
  step: '',
  userInfo: {},
  bankBranchs: [],
  // currentBankCode: '',
  // currentBankName: '',
  bankInfo: {}
}

export default function (state = initialState, action) {
  const handler = ACTION_HANDLERS[action.type]
  return handler ? handler(state, action) : state
}
