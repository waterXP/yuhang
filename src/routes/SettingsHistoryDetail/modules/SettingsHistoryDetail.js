import { asyncFetch, fetchData, toast } from '../../../lib/base'

const GET_HISTORY_DETAIL = 'GET_HISTORY_DETAIL'
const ADD_COMMENT = 'ADD_COMMENT'

export const getHistoryDetail = (id) => {
  return asyncFetch(
    'get /expensesClaimsView/approveDetail.json', {
      expensesClaimsId: id,
      showAttachments: true,
      type: 'afterApproval'
    }, (data, dispatch) => {
      return dispatch({
        type: GET_HISTORY_DETAIL,
        data: data.data
      })
    }
  )
}

export const addComment = (expensesClaimId, remark) => {
  return (dispatch, getState) => {
    fetchData('post /expensesClaimComments/add.json', {
      expensesClaimId,
      remark
    }).then((data) => {
      if (data.result === 0) {
        getHistoryDetail(expensesClaimId)
      } else {
        toast(data.msg)
      }
    })
  }
}

export const ACTIONS_HANDLERS = {
  [GET_HISTORY_DETAIL]: (state, action) => {
    return Object.assign({}, state, {
      historyDetail: action.data
    })
  }
}
