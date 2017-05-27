import { fetchData, fetchFail, FETCH_FAIL } from './base'
import config from '../config'
let dd = config.dd

export const GET_CONFIG = 'GET_CONFIG'

export const getConfig = (url) => {
  return (dispatch, getState) => {
    if (process.env.NODE_ENV === 'development') {
      return dispatch({
        type: 'IN_DEV'
      })
    }
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

export const actions = {
  getConfig
}

const ACTION_HANDLERS = {
  [GET_CONFIG]: (state, action) => {
    if (!action.data.result) {
      const isLogin = !!action.data.isLogin
      const d = action.data.data
      console.log(d)
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
        // dd.biz.navigation.setTitle({
        //   title: '钉钉demo',
        //   onSuccess: function (data) {
        //     alert('y')
        //   },
        //   onFail: function (err) {
        //     alert(err)
        //   }
        // })
        // alert('dd.ready rocks!')
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
              alert(config.corpid)
              const code = result.code

              fetchData('get http://120.77.209.222/wagestest/isvLogin', {
                corpid: config.corpid,
                code: code,
                loginType: 'Mobile'
              })
              .then((data) => {
                if (data.result == "0") {
                    // $("#mdmsg").val("免登入成功: " + JSON.stringify(res.data));
                    alert(JSON.stringify(data.data))
                    alert('OK, I\'m in')
                  } else {
                    alert(data.msg);
                  }
              })
              .catch((e) => {
                alert(e)
              })
              //获取code,通过code换取用户身份信息
              // $.ajax({
              //   url: '${base}/isvLogin',
              //   data: {
              //     corpid: config.corpId,
              //     code: code,
              //     loginType: 'Mobile'
              //   },
              //   type: 'get',
              //   cache: false,
              //   dataType: 'json',
              //   success: function(res) {
              //     if (res.result == "0") {
              //       // $("#mdmsg").val("免登入成功: " + JSON.stringify(res.data));
              //       alert(JSON.stringify(res.data))
              //       alert('OK, I\'m in')
              //     } else {
              //       alert(res.msg);
              //     }
              //   },
              //   error: function(data) {
              //     alert('服务器异常 ' + JSON.stringify(data));
              //   }
              // })
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

