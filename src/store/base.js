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

export default {
  getUrlParam,
  fetchData,
  fetchFail,
  FETCH_FAIL
}
