const deviceHeight = document.body.offsetHeight
const rootElement = document.getElementById('root')
const isDev = process.env.NODE_ENV === 'development'

export default {
  deviceHeight,
  rootElement,
  isDev,
  prodApi: 'http://101.71.130.161/api/',
  devApi: '/api/'
}
