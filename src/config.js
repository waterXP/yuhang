const deviceHeight = document.body.offsetHeight
const rootElement = document.getElementById('root')
const isDev = process.env.NODE_ENV === 'development'

export default {
  deviceHeight,
  rootElement,
  isDev,
  prodApi: 'http://sso.chanyecloud.com/',
  devApi: '/api/'
}
