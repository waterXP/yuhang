export const CLEAN_FILTER = 'CLEAR_FILTER'
export const SEL_MONTH = 'SEL_MONTH'
export const SEL_YEAR = 'SEL_YEAR'
export const TOGGLE_YEARS = 'TOGGLE_YEARS'
export const CHANGE_YEARS = 'CHANGE_YEARS'

export const cleanFilter = () => {
  return {
    type: CLEAN_FILTER
  }
}

export const selMonth = (month) => {
  return {
    type: SEL_MONTH,
    target: month
  }
}

export const selYear = (year) => {
  return {
    type: SEL_YEAR,
    target: year
  }
}

export const toggleYears = () => {
  return {
    type: TOGGLE_YEARS
  }
}

export const changeYears = (offset) => {
  return {
    type: CHANGE_YEARS,
    offset
  }
}

export const actions = {
  cleanFilter,
  selMonth,
  selYear
}

export const ACTIONS_HANDLERS = {  
  [CLEAN_FILTER]: (state, action) => {
    const time = new Date()
    return Object.assign({}, state, {
      filter: {
        year: time.getFullYear(),
        month: time.getMonth(),
        showYears: false
      }
    })
  },
  [SEL_MONTH]: (state, action) => {
    return Object.assign({}, state, {
      filter: {
        ...state.filter,
        month: action.target
      }
    })
  },
  [SEL_YEAR]: (state, action) => {
    return Object.assign({}, state, {
      filter: {
        ...state.filter,
        year: action.target,
        showYears: false
      }
    })
  },
  [TOGGLE_YEARS]: (state, action) => {
    const currentYear = state.filter.year
    const startYear = currentYear - (currentYear - 1970) % 9
    const years = []
    for (let i = 0; i < 9; i++) {
      years.push(startYear + i)
    }
    return Object.assign({}, state, {
      filter: {
        ...state.filter,
        showYears: !state.filter.showYears,
        years: years,
        currentYear
      }
    })
  },
  [CHANGE_YEARS]: (state, action) => {
    let currentYear = state.filter.currentYear
    currentYear += action.offset
    const startYear = currentYear - (currentYear - 1970) % 9
    const years = []
    for (let i = 0; i < 9; i++) {
      years.push(startYear + i)
    }
    return Object.assign({}, state, {
      filter: {
        ...state.filter,
        years,
        currentYear
      }
    })
  }
}
