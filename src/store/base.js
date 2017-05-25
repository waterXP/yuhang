export const FETCH_FAIL = 'FETCH_FAIL'

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
  }).then((response) => response.json())
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
  }).then((response) => response.json())
}

export const fetchData = (action, params = {}) => {
  const [method, url] = action.split(' ')
  if (method.toLowerCase() === 'get') {
    return get(url, params)
  } else {
    return post(url, params)
  }
}

export const fetchFail = (state, action) => {
  // A Error
  return state
}

export default {
  fetchData,
  fetchFail,
  FETCH_FAIL
}