import { fetchData, fetchFail, FETCH_FAIL, asyncFetch, getTestAccount,
  errFunc } from '@/lib/base'
import config, { dd } from '@/config'

export const GET_CONFIG = 'GET_CONFIG'
export const SET_STEP = 'SET_STEP'
export const IN_BUSY = 'IN_BUSY'
export const IN_DEV = 'IN_DEV'
export const GET_ALIPAY_SWITCH = 'GET_ALIPAY_SWITCH'

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

export const getAlipaySwitch = () =>
  asyncFetch(
    'get /isvTickets/getAplipaySwitch.json', {},
    ({ data }, dispatch) =>
      dispatch({
        type: GET_ALIPAY_SWITCH,
        alipaySwitch: data
      })
  )

export const actions = {
  getConfig,
  setStep,
  getAlipaySwitch
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
          // alert('not loading')
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
      return Object.assign({}, state, { corpId: d.corpId, isBusy: false })
    } else {
      errFunc(action.data.statusText)
      return state
    }
  },
  [IN_DEV]: (state, action) => Object.assign({}, state, { isBusy: false }),
  [FETCH_FAIL]: fetchFail,
  [SET_STEP]: (state, { step }) => 
    Object.assign({}, state, { step }),
  [IN_BUSY]: (state, { isBusy, clearStep }) =>
    Object.assign({}, state, { isBusy, step: clearStep ? '' : state.step }),
  [GET_ALIPAY_SWITCH]: (state, { alipaySwitch }) =>
    Object.assign({}, state, { alipaySwitch })
}

const initialState = {
  step: '',
  isBusy: false,
  alipaySwitch: 0
}
export default function (state = initialState, action) {
  const handler = ACTION_HANDLERS[action.type]
  return handler ? handler(state, action) : state
}
