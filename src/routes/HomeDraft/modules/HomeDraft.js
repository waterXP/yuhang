import { asyncFetch , goLocation } from '@/lib/base'

export const GET_DRAFT = 'GET_DRAFT'
export const INITIAL_DRAFT = 'INITIAL_DRAFT'

export const getDraft = () => {
  //=====
  //console.log(22222)
  return asyncFetch(
    'get expensesClaims/myList.json',
    {
      current_page:1,
      statusVal:0
    },
    (data, dispatch) => {
      //console.log(data.data);
      return dispatch({
        type: GET_DRAFT,
        draft: data
      })
    }
  )
  //=====
}

export const initialDraft = () => {
  return {
    type: INITIAL_DRAFT
  }
}

export const deleteExp=(expensesClaimsId)=>{
  return asyncFetch(
    'get expensesClaims/delete.json',
    {
      id:expensesClaimsId
    },
    (data,dispatch) => {
      dispatch(getDraft())
      //console.log(data.data);
     /* return dispatch({
        type: GET_DRAFT,
        draft: data
      })*/
    }
  )
}

export const actions = {
  getDraft,
  initialDraft
}

export const ACTION_HANDLERS = {
  [GET_DRAFT]: (state, action) => {
    return Object.assign({}, state, {draft: action.draft})
  },
  [INITIAL_DRAFT]: (state, action) => {
    return Object.assign({}, state, {draft: []})
  }
}










