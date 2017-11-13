import React from 'react'
import ReactDOM from 'react-dom'
import createStore from './store/createStore'
import AppContainer from './containers/AppContainer'
import 'babel-polyfill'
// ========================================================
// Store Instantiation
// ========================================================
const initialState = window.__INITIAL_STATE__
const store = createStore(initialState)

// ========================================================
// Render Setup
// ========================================================
const MOUNT_NODE = document.getElementById('root')

let render = () => {
  const routes = require('./routes/index').default(store)

  ReactDOM.render(
    <AppContainer store={store} routes={routes} />,
    MOUNT_NODE
  )
}
// This code is excluded from production bundle
if (__DEV__) {
  if (module.hot) {
    // Development render functions
    const renderApp = render
    const renderError = (error) => {
      const RedBox = require('redbox-react').default

      ReactDOM.render(<RedBox error={error} />, MOUNT_NODE)
    }

    // Wrap render in try/catch
    render = () => {
      try {
        renderApp()
      } catch (error) {
        console.error(error)
        renderError(error)
      }
    }

    // Setup hot module replacement
    module.hot.accept('./routes/index', () =>
      setImmediate(() => {
        ReactDOM.unmountComponentAtNode(MOUNT_NODE)
        render()
      })
    )
  }
}

/**
 * fix ios device bounce
 * check elements's heigth,
 * if all element not heighter then root element,
 * prevent default
 */
const u = navigator.userAgent
const isiOS = !!u.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/)
if (isiOS) {
  const deviceHeight = document.body.offsetHeight
  const rootElement = document.getElementById('root')
  document.body.addEventListener(
    'touchmove',
    function (e) {
      let target = e.target
      while (target !== rootElement) {
        if (deviceHeight < target.scrollHeight) {
          return
        }
        target = target.parentNode
      }
      e.preventDefault()
    },
    false
  )
}

// ========================================================
// Go!
// ========================================================
render()
