import { injectReducer } from '../../store/reducers'
// import { ACTION_HANDLERS } from './modules/SettingsEditAlipay'

// export const settingsEditAlipayHandlers = ACTION_HANDLERS

export default (store) => ({
  path : 'edit/alipay',
  getComponent (nextState, cb) {
    require.ensure([], (require) => {
      const Container = require('./containers/SettingsEditAlipayContainer').default
      cb(null, Container)
    }, 'editAlipay')
  }
})

