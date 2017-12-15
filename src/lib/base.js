import { hashHistory, location } from 'react-router'
import React from 'react'
import fetch from 'isomorphic-fetch'
export const FETCH_FAIL = 'FETCH_FAIL'
export const FETCH_FIN = 'FETCH_FIN'

export const history = hashHistory

let err = false
export const errFunc = (msg) => {
  if (!err) {
    window.alert(msg)
    err = true
  }
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
      errFunc(response.statusText)
      return response
    }
  })
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
      errFunc(response.statusText)
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
        alert(data.msg)
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
  .then(
    (res) => {
      if (!res.ok) {
        errFunc(res.statusText)
      }
    }
  )
}

export const goBack = hashHistory.goBack

export const reload = window.location.reload

export const fetchFail = (state, action) => {
  errFunc(action.err)
  return state
}

export const fetchFin = (state, action) => {
  return state
}

export const goLocation = (location = { pathname: '/' }, replace) =>
  replace
    ? hashHistory.replace('/home')
    : hashHistory.push(location)

export const setQuery = (query) => {
  const location = hashHistory.getCurrentLocation()
  hashHistory.replace({
    pathname: location.pathname,
    query: Object.assign({}, location.query, query)
  })
}
export const removeQuery = (target) => {
  const location = hashHistory.getCurrentLocation()
  let query = Object.assign({}, location.query)
  delete query[target]
  hashHistory.replace({
    pathname: location.pathname,
    query
  })
}

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
        alert(data.msg || '系统忙，请稍后再试')
      }
      return data
    })
    .catch((e) => {
      alert('请求失败，请检查网络并稍后再试')
    })
}

export const regPhone = /^1[34578]\d{9}$/
export const regMail = /^[a-zA-Z0-9_-]+@[a-zA-Z0-9_-]+(\.[a-zA-Z0-9_-]+)+$/
export const regAccount = /^([1-9]{1})(\d{7,23})$/
