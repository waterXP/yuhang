export const getUrlParams = (name) => {
  const reg = new RegExp('(^|&)' + name + '=([^&]*)(&|$)')
  const r = window.location.search.substr(1).match(reg)
  if (r != null) {
    return r[2]
  }
  return ''
}

// console.log(getUrlParams('modelType'))
// console.log(getUrlParams('corpid'))
const modelType = +getUrlParams('modelType')

if (process.env.NODE_ENV !== 'development' && window.parent) {
  // console.log('prod')
} else {
  console.log('dev')
}

export const dd = process.env.NODE_ENV !== 'development' &&
window.parent ? window.parent.dd : window.dd

export const isDev = process.env.NODE_ENV === 'development'
export default {
  dd,
  modelType,
  prodApi: modelType !== 1
    ? 'http://120.77.209.222/wagestest/'
    : 'http://wages.hz.taeapp.com/',
  devApi: '/api/',
  ddurl:  modelType !== 1
    ? 'http://120.77.209.222/wagestest/'
    : 'http://wages.hz.taeapp.com/'
}
