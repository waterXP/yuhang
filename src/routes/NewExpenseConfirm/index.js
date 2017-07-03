import { injectReducer } from '@/store/reducers'
// import { ACTION_HANDLERS } from './modules/NewExpenseConfirm'
// export const newExpenseConfirmHandlers = ACTION_HANDLERS

export default (store) => ({
  path : 'expense/confirm',
  getComponent (nextState, cb) {
    require.ensure([], (require) => {
      const Container = require('./containers/NewExpenseConfirmContainer').default
      cb(null, Container)
    }, 'expenseConfirm')
  }
})

