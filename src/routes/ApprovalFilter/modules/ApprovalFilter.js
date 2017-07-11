export const UPDATE_FILTER = 'UPDATE_FILTER'
export const UPDATE_BILL_RANGE = 'UPDATE_BILL_RANGE'

export function updateFilter (targetId) {
  return {
    type: UPDATE_FILTER,
    targetId
  }
}

export function updateBillRange (range) {
  console.log(range)
  return {
    type: UPDATE_BILL_RANGE,
    range
  }
}

export const actions = {
  updateFilter,
  updateBillRange
}

export const ACTION_HANDLERS = {
  [UPDATE_FILTER]: (state, action) => {
    let filter = [...state.filter]
    let target = filter.find((v) => v.id === action.targetId)
    target.sel = !target.sel
    return (Object.assign({}, state, { filter }))
  },
  [UPDATE_BILL_RANGE]: (state, action) => {
    let [start, end] = action.range
    console.log(start)
    return (Object.assign(
      {},
      state,
      {
        billRange: [{
          value: start || '',
          holder: '最小值'
        }, {
          value: end || '',
          holder: '最大值'
        }]
      }
    ))
  }
}
