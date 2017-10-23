import { asyncFetch } from '@/lib/base'

export const SAVE_DATA = 'SAVE_DATA'
export const CLEAN_DATA = 'CLEAN_DATA'
export const GET_COST_TYPE = 'GET_COST_TYPE'
export const SET_STEP = 'SET_STEP'
export const SET_APP_CATCH = 'SET_APP_CATCH'
export const REMOVE_ATTACHMENT = 'REMOVE_ATTACHMENT'

export const saveData = (data) => {
  return {
    type: SAVE_DATA,
    data: data
  }
}

export const cleanData = () => {
  return {
    type: CLEAN_DATA
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

export const removeAttachment = (index) => {
  return {
    type: REMOVE_ATTACHMENT,
    index
  }
}

export const actions = {
  saveData,
  getCostType,
  setStep,
  setAppCatch,
  removeAttachment
}

const ACTION_HANDLERS = {
  [SAVE_DATA]: (state, action) =>
    Object.assign({}, state, { data: action.data }),
  [CLEAN_DATA]: (state, action) =>
    Object.assign({}, state, { data: undefined }),
  [GET_COST_TYPE]: (state, { costTypes }) =>
    Object.assign({}, state, { costTypes }),
  [SET_STEP]: (state, { step }) =>
    Object.assign({}, state, { step }),
  [SET_APP_CATCH]: (state, { appCatch }) =>
    Object.assign({}, state, { appCatch }),
  [REMOVE_ATTACHMENT]: (state, { index }) => {
    const { data } = state
    if (data && (
      data.attachmentList.length !== 0 ||
      data.restAttachments.length !== 0
    )) {
      const _index = index < data.restAttachments.length
        ? index
        : index - data.restAttachments.length
      const target = index < data.restAttachments.length
        ? 'restAttachments'
        : 'attachmentList'
      return Object.assign(
        {}, state, { data: Object.assign(
          {}, state.data, { [target]: [
            ...data[target].slice(0, index),
            ...data[target].slice(index + 1)
          ] })
        }
      )
    }
    return state
  }
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
