import { asyncFetch,dingShowPreLoad,dingHidePreLoad } from '@/lib/base'

export const GET_NOT_PAID = 'GET_NOT_PAID'
export const INITIAL_NOT_PAID = 'INITIAL_NOT_PAID'
export const GET_NOT_PAID_SUMMONEY = "GET_NOT_PAID_SUMMONEY"

export const getNotPaid = () => {
  //=====
  return asyncFetch(
    'get expensesClaimsMobile/waitPaidList.json',
    {},
    (data, dispatch) => {
      //console.log(data.data);
      dingHidePreLoad()
      return dispatch({
        type: GET_NOT_PAID,
        notPaid: data.data
      })
    }
  )
  //=====
}
export const getSumMoney=()=>{
  return asyncFetch(
    'get expensesClaimsMobile/getSumMoney.json',
    {type:2},
    (data, dispatch) => {
      //console.log(data.data);
      return dispatch({
        type: GET_NOT_PAID_SUMMONEY,
        notPaidSumMoney: data.data
      })
    }
  )
}

export const initialNotPaid = () => {
  return {
    type: INITIAL_NOT_PAID
  }
}

export const actions = {
  getNotPaid,
  initialNotPaid,
  getSumMoney
}

export const ACTION_HANDLERS = {
  [GET_NOT_PAID]: (state, action) => {
    return Object.assign({}, state, {notPaid: action.notPaid})
  },
  [GET_NOT_PAID_SUMMONEY]:(state,action)=>{
    return Object.assign({},state,{notPaidSumMoney:action.notPaidSumMoney})
  },
  [INITIAL_NOT_PAID]: (state, action) => {
    return Object.assign({}, state, {notPaid: []})
  }
}










