import { hashHistory } from 'react-router'
import config, { dd, isDev, getUrlParams } from '@/config'
import React from 'react'
import fetch from 'isomorphic-fetch'

export const FETCH_FAIL = 'FETCH_FAIL'
export const FETCH_FIN = 'FETCH_FIN'

export const history = hashHistory

export const getTimeFromStr = (strDT) => {
  const c = new Date()
  let month = c.getMonth() + 1
  month = month < 10 ? '0' + month : '' + month
  let date = c.getDate()
  date = date < 10 ? '0' + date : '' + date
  let r = {
    ymd: new Date(`${c.getFullYear()}-${month}-${date}`)
  }
  const day = [
    '周日',
    '周一',
    '周二',
    '周三',
    '周四',
    '周五',
    '周六'
  ]
  const d = new Date(strDT)
  const sub = r.ymd - d
  if (sub === 0) {
    r.special = '今天'
  } else if (sub === 86400000) {
    r.special = '昨天'
  }
  r.day = day[d.getDay()]
  return r
}

export const get = (url, params = {}) => {
  const headers = new Headers({
    'Accept': 'application/json',
    'Content-Type': 'application/json; charset=UTF-8'
  })
  let queryUrl = url
  if (queryUrl.indexOf('?') < 0) {
    queryUrl += '?'
  }
  for (let str in params) {
    queryUrl += `${str}=${params[str]}&`
  }
  return fetch(queryUrl, {
    method: 'GET',
    credentials: 'same-origin',
    headers: headers
  }).then((response) => {
    if (response.status === 200) {
      return response.json()
    } else {
      return response
    }
  })
}

export const getHighLightText = (source, keyword) => {
  if (!source) {
    return { __html: '' }
  }
  let r = source.replace(
    /[<>&"]/g,
    (c) => ({
      '<': '&lt;',
      '>': '&gt;',
      '&': '&amp;',
      '"': '&quot;'
    }[c])
  )
  r = r.replace(
    new RegExp(keyword, 'gm'),
    `<span class='color-error'>${keyword}</span>`
  )
  return { __html: r }
}

export const post = (url, params = {}) => {
  const headers = new Headers({
    'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8'
  })
  let query = ''
  for (let str in params) {
    if (params[str] instanceof Array) {
      params[str].forEach((v, i) => {
        if (typeof v === 'number' ||
          typeof v === 'boolean' ||
          typeof v === 'string') {
          query += `${str}[${i}]=${v}&`
        } else {
          for (let child in v) {
            query += `${str}[${i}].${child}=${v[child]}&`
          }
        }
      })
    } else {
      query += `${str}=${params[str]}&`
    }
  }
  return fetch(url, {
    method: 'POST',
    credentials: 'same-origin',
    headers: headers,
    body: query
  }).then((response) => {
    if (response.status === 200) {
      return response.json()
    } else {
      return response
    }
  })
}

export const asyncFetch = (action, params = {}, cb) => {
  if (!cb) {
    cb = (data, dispatch, getState) => {
      let msg = data.msg || '操作成功'
      return dispatch({
        type: FETCH_FIN,
        msg
      })
    }
  }
  return (dispatch, getState) => {
    fetchData(action, params)
    .then((data) => {
      if (!data.result) {
        return cb(data, dispatch, getState)
      } else {
        toast(data.msg)
        return dispatch({
          type: FETCH_FAIL,
          err: data.msg || '系统忙，请稍后再试'
        })
      }
    })
    .catch((e) => {
      return dispatch({
        type: FETCH_FAIL,
        err: e
      })
    })
  }
}

export const fetchData = (action, params = {}) => {
  let [method, url] = action.split(' ')
  if (url.indexOf('/') === 0) {
    url = url.substr(1)
  }

  
  url = (process.env.NODE_ENV === 'development'
    ? config.devApi : config.prodApi) + url

  for (let v in params) {
    if (params[v] === null) {
      delete params[v]
    }
  }
  if (method.toLowerCase() === 'get') {
    return get(url, params)
  } else {
    return post(url, params)
  }
}

export const getTestAccount = () => {
  const headers = new Headers({
    'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8'
  })
  return fetch('/api/setUser.jsp', {
    method: 'GET',
    credentials: 'same-origin',
    headers: headers
  })
}

export const fetchFail = (state, action) => {
  return state
}

export const fetchFin = (state, action) => {
  return state
}

const corpid = getUrlParams('corpid') || 'dinge66a5fd3ad45cc2a35c2f4657eb6378f'
Object.assign(config, {
  host: config.modelType !== 1
    ? `http://120.77.209.222/wagestest/?corpid=${corpid}`
    : `http://wages.hz.taeapp.com/?corpid=${corpid}`,
  corpid
})

export const goLocation = (location = { pathname: '/' }) =>
  hashHistory.push(location)

export const getDate = (nDate = (new Date()), fmt = 'yyyy-MM-dd hh:mm:ss') => {
  const sDate = new Date(nDate)
  const dateObj = {
    'M+': sDate.getMonth() + 1,
    'd+': sDate.getDate(),
    'h+': sDate.getHours(),
    'm+': sDate.getMinutes(),
    's+': sDate.getSeconds(),
    'q+': Math.floor((sDate.getMonth() + 3) / 3),
    'S': sDate.getMilliseconds()
  }
  if (/(y+)/.test(fmt)) {
    fmt = fmt.replace(RegExp.$1, (sDate.getFullYear() + '')
      .substr(4 - RegExp.$1.length))
  }
  for (const s in dateObj) {
    if (new RegExp('(' + s + ')').test(fmt)) {
      fmt = fmt.replace(RegExp.$1, (RegExp.$1.length === 1)
        ? (dateObj[s])
        : (('00' + dateObj[s]).substr(('' + dateObj[s]).length)))
    }
  }
  return fmt
}

export const getCash = (cash = 0, symbol = '') => {
  if (isNaN(cash)) {
    return '--'
  }
  cash = Math.floor(cash * 100) / 100
  let result = '' + cash
  let dot = result.indexOf('.')
  if (dot < 0) {
    dot = result.length
    result += '.'
  }
  while (result.length <= dot + 2) {
    result += '0'
  }
  return symbol + result
}

export const getNumber = (number = 0, dot = 2, min, max) => {
  if (isNaN(number) || isNaN(dot)) {
    return ''
  }
  if (max !== '' && max !== undefined && number > max) {
    number = max
  }
  if (min !== '' && min !== undefined && number < min) {
    number = min
  }
  dot = Math.floor(dot)
  const str = '' + number
  let [integer, decimal] = str.split('.')
  integer = isNaN(integer) ? 0 : +integer
  decimal = decimal ? decimal.substr(0, dot) : ''
  while (decimal.length < dot) {
    decimal += '0'
  }
  return `${integer}.${decimal}`
}

export const removeYear = (time) => {
  if (!time) {
    return []
  }
  let _time = time.split('-')
  _time.shift()
  _time = _time.join('-')
  return _time
}
export const pageSize = 20

export const highLightDate = (str) => {
  let strReg = /^[a-zA-Z]{2}[0-9]{8}/
  let dateReg = /[0-9]{8}$/
  let fStr = strReg.exec(str)[0]
  let dateStr = dateReg.exec(fStr)[0]
  let dateArr = str.split(dateStr)
  return (
    <span>{dateArr[0]}{
      <span className='wm-color-important'>{dateStr}</span>
    }{dateArr[1]}</span>
  )
}

export const regPhone = /^1[34578]\d{9}$/
export const regMail = /^[a-zA-Z0-9_-]+@[a-zA-Z0-9_-]+(\.[a-zA-Z0-9_-]+)+$/
export const regAccount = /^([1-9]{1})(\d{7,23})$/

export const alert = (message = '', title = '', buttonName = '确定') => {
  dd.device.notification.alert({
    message,
    title,
    buttonName
  })
}

export const toast = (text = '', icon = '', duration = 1) => {
  if (config.inDev) {
    window.alert(text)
  } else {
    dd.device.notification.toast({
      icon,
      text,
      duration
    })
  }
}

export const confirm =
(message = '', title = '', callback, buttonLabels = ['确定', '取消']) => {
  if (!isDev) {
    dd.device.notification.confirm({
      message: message,
      title: title,
      buttonLabels: buttonLabels,
      onSuccess: function (result) {
        if (result.buttonIndex === 0) {
          callback && callback()
        }
      },
      onFail: function (err) { toast(err) }
    })
  } else {
    const r = window.confirm('确认删除？')
    if (r) {
      callback && callback()
    }
  }
}

export const dingSend = (users = [], corpId = '', text = '', cb1, cb2) => {
  dd.biz.ding.post
  ? dd.biz.ding.post({
    users : users,
    corpId: corpId,
    type: 1,
    alertType: 2,
    text: text,
    onSuccess: () => {
      cb1 && cb1()
    },
    onFail: () => {
      cb2 && cb2()
    }
  })
  : dd.biz.ding.create({
    users: users,
    corpId: corpId,
    type: 1,
    alertType: 2,
    text: text,
    bizType: 0,
    onSuccess: () => {
      cb1 && cb1()
    },
    onFail: () => {
      cb2 && cb2()
    }
  })
}
export const dingApproveDetail = (url, cb) => {
  dd.biz.util.openLink({
    url: url,
    onSuccess : function (result) {
      cb && cb()
    },
    onFail : function (err) { toast(err) }
  })
}

export const openDatePicker = (defaultValue = +new Date(), callback) => {
  if (isDev) {
    return +new Date()
  }
  dd.biz.util.datepicker({
    format: 'yyyy-MM-dd',
    value: getDate(defaultValue, 'yyyy-MM-dd'),
    onSuccess: function (result) {
      callback && callback(result.value)
    },
    onFail: function (err) {
      // when click cancel, the errorCode is 3
      if (err.errorCode !== 3) {
        toast(err)
      }
    }
  })
}

export const datePicker = (defaultValue = +new Date(), cb) => {
  if (isDev) {
    return +new Date()
  }
  dd.biz.util.datepicker({
    format: 'yyyy-MM',
    value: getDate(defaultValue, 'yyyy-MM'),
    onSuccess: function (d) {
      cb && cb(d.value)
    },
    onFail: function (err) {
      // when click cancel, the errorCode is 3
      if (err.errorCode !== 3) {
        toast(err)
      }
    }
  })
}

export const getChosenSource = (list = [], keyLabel = 'name') => {
  let source = []
  list.forEach((v, i) => {
    source.push({
      key: v[keyLabel],
      value: i
    })
  })
  return source
}

export const openChosen = (source, selectedKey = 0, callback) => {
  if (isDev) {
    return
  }
  dd.biz.util.chosen({
    source,
    selectedKey,
    onSuccess: function (result) {
      callback && callback(result)
    },
    onFail: function (err) {
      if (err.errorCode !== 3) {
        toast(err)
      }
    }
  })
}

export const uploadImage = (max, callback) => {
  if (isDev) {
    return
  }
  dd.biz.util.uploadImage({
    multiple: true,
    max: max,
    onSuccess : function (result) {
      callback(result)
    },
    onFail : function (err) {
      if (err.errorCode !== -1) {
        toast(err)
      }
    }
  })
}

export const previewImage = (img) => {
  if (isDev) {
    return
  }
  dd.biz.util.previewImage({
    urls: [img],
    current: img,
    onFail: function (err) { toast(err) }
  })
}

export const dingShowPreLoad = () => {
  if (!isDev) {
    dd.device.notification.showPreloader({
      text: '使劲加载中..',
      showIcon: true,
      onSuccess : function (result) {},
      onFail: function (err) { toast(err) }
    })
  }
}
export const dingHidePreLoad = () => {
  if (!isDev) {
    dd.device.notification.hidePreloader({
      onSuccess: function (result) {},
      onFail: function (err) { toast(err) }
    })
  }
}
export const dingPreviewImage = (urls, current) => {
  dd.biz.util.previewImage({
    urls: urls,
    current: current,
    onSuccess: function (result) {},
    onFail: function (err) { toast(err) }
  })
}
export const dingSetNavRight = (text = '筛选', cb, show = false, control = true) => {
  if (!isDev) {
    dd.biz.navigation.setRight({
      show: show,
      control: control,
      text: text,
      onSuccess: function (result) { cb && cb() },
      onFail: function (err) { toast(err) }
    })
  }
}
export const dingSetNavLeft =
(text = '', control = false, fun, show = true, showIcon = false) => {
  if (!isDev) {
    dd.biz.navigation.setLeft({
      show: show,
      control: control,
      showIcon: showIcon,
      text: text,
      onSuccess: function (result) { fun && fun() },
      onFail: function (err) { toast(err) }
    })
  }
}

export const dingSetNavLeftAndroid = (fun) => {
  document.addEventListener('backbutton', function (e) {
    fun && fun()
    e.preventDefault()
  })
}

export const dingSetTitle = (title = '') => {
  if (!isDev) {
    dd.biz.navigation.setTitle({
      title: title,
      onSuccess: function (result) {},
      onFail: function (err) { toast(err) }
    })
  }
}

export const getArray = (obj) => {
  let result = []
  for (const i in obj) {
    result[i] = obj[i]
  }
  return result
}

export const getObjArray = (obj, idLabel = 'id', valueLabel = 'value') => {
  let result = []
  for (const i in obj) {
    let temp = {}
    temp[idLabel] = i
    temp[valueLabel] = obj[i]
    result.push(temp)
  }
  return result
}

export const doFetch = (action, params = {}) => {
  return fetchData(action, params)
    .then((data) => {
      if (data.result) {
        toast(data.msg || '系统忙，请稍后再试')
      }
      return data
    })
    .catch((e) => {
      toast('请求失败，请检查网络并稍后再试')
    })
}

export const blurInput = () => {
  const isIPHONE = navigator.userAgent.toUpperCase().indexOf('IPHONE') !== -1
  if (isIPHONE) {
    const obj = document.querySelectorAll('.need-blur input, .need-blur textarea')
    for (let i = 0; i < obj.length; i++) {
      obj[i].blur()
    }
  }
}

export const dingSetMenu = (items, cb) => {
  if (!isDev) {
    if (items) {
      dd.biz.navigation.setMenu({
        items,
        onSuccess: function (d) { cb && cb(d) },
        onFail: function (e) { toast(e) }
      })
    } else {
      dd.biz.navigation.setMenu({
        items: [],
        onSuccess: function (d) { cb && cb() },
        onFail: function (e) { toast(e) }
      })
    }
  }
}

export const checkCharacter =
(str, table = ['^[a-zA-Z]', '^[\\u4E00-\\u9FFF]']) => {
  let r = 1
  let hit = false
  table.find((v) => {
    if (RegExp(v).test(str)) {
      return true
    } else {
      r++
    }
  })
  return r
}

export const compareCharacter = (a, b) => {
  if (a === b) {
    return 0
  }
  let _a = ''
  let _b = ''
  let max = a.length > b.length ? a.length : b.length
  for (let i = 0; i < max; i++) {
    if (a[i] !== b[i]) {
      _a = a[i]
      _b = b[i]
      break
    }
  }
  if (_a === undefined) {
    return -1
  }
  if (_b === undefined) {
    return 1
  }
  const _atp = checkCharacter(_a)
  const _btp = checkCharacter(_b)
  if (_atp !== _btp) {
    return _atp - _btp
  } else {
    return _a.localeCompare(_b, 'zh')
  }
}

export default {
  getUrlParams,
  fetchData,
  fetchFail,
  fetchFin,
  FETCH_FAIL,
  FETCH_FIN,
  goLocation,
  getDate,
  getCash,
  alert,
  toast,
  confirm,
  dingSend,
  dingApproveDetail,
  doFetch,
  blurInput,
  checkCharacter,
  compareCharacter
}
