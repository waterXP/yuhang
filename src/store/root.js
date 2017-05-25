import { fetchData, fetchFail, FETCH_FAIL } from './base'
import config from '../config'
let dd = config.dd

export const GET_CONFIG = 'GET_CONFIG'

export const getConfig = (url) => {
  return (dispatch, getState) => {
    fetchData('get /api/getConfig.json', {
      corpid: config.corpid,
      url: config.host
    })
    .then((data) => {
      return dispatch({
        type: GET_CONFIG,
        data: data
      })
    })
    .catch((e) => {
      return dispatch({
        type: FETCH_FAIL,
        err: e
      })
    })
  }
}

export const actions = {
  getConfig
}

const ACTION_HANDLERS = {
  [GET_CONFIG]: (state, action) => {
    if (!action.data.result) {
      const d = action.data.data
      dd.config({
        agentId: d.agentId,
        corpId: d.corpId,
        timeStamp: d.timeStamp,
        signature: d.signature,
        nonceStr: d.nonceStr,
        jsApiList : [ 'runtime.info', 'biz.contact.choose',
        'device.notification.confirm', 'device.notification.alert',
        'device.notification.prompt', 'biz.ding.post',
        'biz.util.openLink' ] 
      })
      dd.ready(function() {
        dd.biz.navigation.setTitle({
          title: '钉钉demo',
          onSuccess: function(data) {
            console.log('y')
          },
          onFail: function(err) {
            console.log(d)
          }
        });
        alert('dd.ready rocks!');
      })
      dd.error(function(error){
        alert('dd error: ' + JSON.stringify(err))
      })
      return state
    } else {
      return state
    }
  },
  [FETCH_FAIL]: fetchFail
}

const initialState = {}
export default function  (state = initialState, action) {
  const handler = ACTION_HANDLERS[action.type]
  return handler ? handler(state, action) : state
}

