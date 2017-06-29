import { fetchData, fetchFail, FETCH_FAIL, getTestAccount } from '../lib/base'
import config, { dd } from '../config'

export const GET_CONFIG = 'GET_CONFIG'

export const getConfig = (url) => {
  return (dispatch, getState) => {
    if (process.env.NODE_ENV === 'development') {
      getTestAccount()
      .then((data) => {
        config.inDev = true
        return dispatch({
          type: 'IN_DEV'
        })
      })
    } else {
      fetchData('get getConfig.json', {
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
}

export const actions = {
  getConfig
}

const ACTION_HANDLERS = {
  [GET_CONFIG]: (state, action) => {
    if (action.data.result === 0) {
      const isLogin = !!action.data.isLogin
      const d = action.data.data
      dd.config({
        agentId: d.agentId,
        corpId: d.corpId,
        timeStamp: d.timeStamp,
        signature: d.signature,
        nonceStr: d.nonceStr,
        jsApiList : [ 'runtime.info', 'runtime.permission.requestAuthCode', 'biz.contact.choose',
          'device.notification.confirm', 'device.notification.alert',
          'device.notification.prompt', 'biz.ding.post',
          'biz.util.openLink' ]
      })
      dd.ready(function () {
        dd.runtime.info({
          onSuccess: function (info) {
            // alert('runtime info: ' + JSON.stringify(info));
          },
          onFail: function (err) {
            alert('fail: ' + JSON.stringify(err))
          }
        })
        if (!isLogin) {
          dd.runtime.permission.requestAuthCode({
            corpId: config.corpid,
            onSuccess: function(result) {
              // alert(config.corpid)
              const code = result.code
              fetchData('get /isvLogin', {
                corpid: config.corpid,
                code: code,
                loginType: 'Mobile'
              })
              .then((data) => {
                if (data.result === 0) {
                    // $("#mdmsg").val("免登入成功: " + JSON.stringify(res.data));
                    // alert(JSON.stringify(data.data))
                  } else {
                    alert(data.msg);
                  }
              })
              .catch((e) => {
                alert(e)
              })
            },
            onFail: function(err) {
              alert("验证失败：" + JSON.stringify(err));
            }
          })
        }
      })
      dd.error(function(err) {
        alert('dd error: ' + JSON.stringify(err));
      })
      return state
    } else {
      return state
    }
  },
  [FETCH_FAIL]: fetchFail
}

const initialState = {}
export default function (state = initialState, action) {
  const handler = ACTION_HANDLERS[action.type]
  return handler ? handler(state, action) : state
}
