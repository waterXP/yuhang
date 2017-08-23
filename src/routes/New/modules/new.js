import { asyncFetch } from '@/lib/base'

export const SAVE_DATA = 'SAVE_DATA'
export const GET_COST_TYPE = 'GET_COST_TYPE'
export const SET_STEP = 'SET_STEP'
export const SET_APP_CATCH = 'SET_APP_CATCH'

export const saveData = (data) => {
  return {
    type: SAVE_DATA,
    data: data
  }
}
export const getCostType = (deptId) => {
  return asyncFetch(
    'get /costTypes/findCostTypeByDeptId.json',
    { deptId },
    (d, dispatch) => {
      return dispatch({
        type: GET_COST_TYPE,
        costTypes: d.data
      })
    }
  )
}
export const setStep = (step) => {
  return {
    type: SET_STEP,
    step
  }
}
export const setAppCatch = (appCatch) => {
  return {
    type: SET_APP_CATCH,
    appCatch
  }
}

export const actions = {
  saveData,
  getCostType,
  setStep,
  setAppCatch
}

const ACTION_HANDLERS = {
  [SAVE_DATA]: (state, action) =>
    Object.assign({}, state, { data: action.data }),
  [GET_COST_TYPE]: (state, { costTypes }) =>
    Object.assign({}, state, { costTypes }),
  [SET_STEP]: (state, { step }) =>
    Object.assign({}, state, { step }),
  [SET_APP_CATCH]: (state, { appCatch }) =>
    Object.assign({}, state, { appCatch })
}

const initialState = {
  step: '',
  costTypes: [],
  appCatch: {}
}

export default function (state = initialState, action) {
  const handler = ACTION_HANDLERS[action.type]
  return handler ? handler(state, action) : state
}
