export const FETCH_FAIL = 'FETCH_FAIL'

export const fetchData = (action, params = {}) => {
  const [method, url] = action.split(' ')
  const headers = new Headers({
    'Content-type': 'application/x-www-form-urlencoded; charset=UTF-8'
  })
  return fetch(url, {
    method: method,
    headers: headers,
    body: params
  }).then((response) => response.json())
}

export const fetchFail = (state, action) => {
  // we can show action.err on a modal
  return state
}

export default {
  fetchData,
  fetchFail,
  FETCH_FAIL
}