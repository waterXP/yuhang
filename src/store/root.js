import { fetchData, fetchFail, FETCH_FAIL, getTestAccount } from '@/lib/base'
import config, { dd } from '@/config'

export const GET_CONFIG = 'GET_CONFIG'
export const SET_STEP = 'SET_STEP'
export const IN_BUSY = 'IN_BUSY'

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
        url: `${config.ddurl}?corpid=${config.corpid}`
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

export const setStep = (step = '') => {
  return {
    type: SET_STEP,
    step
  }
}

export const inBusy = (isBusy = true, clearStep) => {
  return {
    type: IN_BUSY,
    isBusy,
    clearStep
  }
}

export const actions = {
  getConfig,
  setStep
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
        jsApiList : [
          'runtime.info',
          'runtime.permission.requestAuthCode',
          'biz.contact.choose',
          'device.notification.confirm',
          'device.notification.alert',
          'device.notification.prompt',
          'biz.ding.post',
          'biz.ding.create',
          'biz.util.uploadImage',
          'biz.util.openLink',
          'biz.util.datepicker',
          'biz.util.chosen',
          'biz.util.previewImage'
        ]
      })
      dd.ready(function () {
        dd.runtime.info({
          onSuccess: function (info) {
            // alert('runtime info: ' + JSON.stringify(info))
          },
          onFail: function (err) {
            alert('fail: ' + JSON.stringify(err))
          }
        })
        if (!isLogin) {
          dd.runtime.permission.requestAuthCode({
            corpId: config.corpid,
            onSuccess: function (result) {
              // alert(config.corpid)
              const code = result.code
              fetchData('get /isvLogin', {
                corpid: config.corpid,
                code: code,
                loginType: 'Mobile'
              })
              .then((data) => {
                if (data.result) {
                  alert(data.msg)
                }
              })
              .catch((e) => {
                alert(e)
              })
            },
            onFail: function (err) {
              alert('验证失败：' + JSON.stringify(err))
            }
          })
        }
      })
      dd.error(function (err) {
        alert('dd error: ' + JSON.stringify(err))
      })
      return Object.assign({}, state, { corpId: d.corpId })
    } else {
      return state
    }
  },
  [FETCH_FAIL]: fetchFail,
  [SET_STEP]: (state, { step }) => 
    Object.assign({}, state, { step }),
  [IN_BUSY]: (state, { isBusy, clearStep }) =>
    Object.assign({}, state, { isBusy, step: clearStep ? '' : state.step })
}

const initialState = {
  step: '',
  isBusy: false
}
export default function (state = initialState, action) {
  const handler = ACTION_HANDLERS[action.type]
  return handler ? handler(state, action) : state
}
