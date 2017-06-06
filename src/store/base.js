import { hashHistory } from 'react-router'
import config from '../config'

export const FETCH_FAIL = 'FETCH_FAIL'

export const getUrlParam = (name) => {
  const reg = new RegExp('(^|&)' + name + '=([^&]*)(&|$)')
  const r = window.location.search.substr(1).match(reg)
  if (r != null) return r[2]; return ''
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
    headers: headers
  }).then((response) => {
    if (response.status === 200) {
      return response.json()
    } else {
      return response
    }    
  })
}

export const post = (url, params = {}) => {
  const headers = new Headers({
    'Accept': 'application/json',
    'Content-Type': 'application/json; charset=UTF-8'
  })
  return fetch(url, {
    method: 'POST',
    headers: headers,
    body: JSON.stringify(params)
  }).then((response) => {
    if (response.status === 200) {
      return response.json()
    } else {
      return response
    }    
  })
}

export const fetchData = (action, params = {}) => {
  let [method, url] = action.split(' ')
  if (url.indexOf('/') === 0) {
    url = url.substr(1)
  }
  url = (process.env.NODE_ENV === 'development' ? config.devApi : config.prodApi) + url

  if (method.toLowerCase() === 'get') {
    return get(url, params)
  } else {
    return post(url, params)
  }
}

export const fetchFail = (state, action) => {
  return state
}

const corpid = getUrlParam('corpid') || 'dinge66a5fd3ad45cc2a35c2f4657eb6378f'
Object.assign(config, {
  host: `http://120.77.209.222/mobiletest/?corpid=${corpid}`,
  corpid
})

export const goLocation = (location={ pathname: '/' }) =>
  hashHistory.push(location)

export const getDate = (nDate=(new Date()), fmt='yyyy-MM-dd hh:mm:ss') => {
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
    fmt = fmt.replace(RegExp.$1, (sDate.getFullYear() + '').substr(4 - RegExp.$1.length))
  }
  for (const s in dateObj) {
    if (new RegExp('(' + s + ')').test(fmt)) {
      fmt = fmt.replace(RegExp.$1, (RegExp.$1.length === 1) ?
        (dateObj[s]) :
        (('00' + dateObj[s]).substr(('' + dateObj[s]).length)))
    }
  }  
  return fmt
}

export const getCash = (cash=0, symbol='') => {
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

export default {
  getUrlParam,
  fetchData,
  fetchFail,
  FETCH_FAIL,
  goLocation,
  getDate,
  getCash
}
