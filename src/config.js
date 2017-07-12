export const dd = process.env.NODE_ENV !== 'development' && window.parent ? window.parent.dd : window.parent
export default {
  dd,
  prodApi: 'http://120.77.209.222/wagestest/',
  devApi: '/api/',
  ddurl: 'http://120.77.209.222/wagestest/',
  useLocaldata: false
}
