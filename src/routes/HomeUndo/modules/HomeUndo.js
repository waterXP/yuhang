import { asyncFetch } from '@/lib/base'

export const GET_UNDO = 'GET_UNDO'
export const INITIAL_UNDO = 'INITIAL_UNDO'

export const getUndo = () => {
  //=====
  return asyncFetch(
    'get expensesClaims/myList.json',
    {
      current_page:1,
      statusVal:2
    },
    (data, dispatch) => {
      //console.log(data.data);
      return dispatch({
        type: GET_UNDO,
        undo: data
      })
    }
  )
  //=====
}

export const initialUndo = () => {
  return {
    type: INITIAL_UNDO
  }
}
export const deleteExp=(expensesClaimsId)=>{
  return asyncFetch(
    'get expensesClaims/delete.json',
    {
      id:expensesClaimsId
    },
    (data,dispatch) => {
      dispatch(getUndo())
    }
  )
}

export const actions = {
  getUndo,
  initialUndo
}

export const ACTION_HANDLERS = {
  [GET_UNDO]: (state, action) => {
    return Object.assign({}, state, {undo: action.undo})
  },
  [INITIAL_UNDO]: (state, action) => {
    return Object.assign({}, state, {undo: []})
  }
}