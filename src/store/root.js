export const SET_STEP = 'SET_STEP'
export const IN_BUSY = 'IN_BUSY'

export const setStep = (step = '') => ({
  type: SET_STEP,
  step
})
export const inBusy = (isBusy = true, step) => ({
  type: IN_BUSY,
  isBusy,
  step
})

const ACTION_HANDLERS = {
  [SET_STEP]: (state, { step }) => 
    Object.assign({}, state, { step }),
  [IN_BUSY]: (state, { isBusy, step }) =>
    Object.assign(
      {}, state, {
        isBusy, step: step || ''
      }
    )
}

const initialState = {
  step: '',
  isBusy: false,
  alipaySwitch: 0
}

export default function (state = initialState, action) {
  const handler = ACTION_HANDLERS[action.type]
  return handler ? handler(state, action) : state
}
