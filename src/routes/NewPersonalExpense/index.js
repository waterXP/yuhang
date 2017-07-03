import { injectReducer } from '@/store/reducers'

export default (store) => ({
  path : 'NewPersonalExpense',
  getComponent (nextState, cb) {
    require.ensure([], (require) => {
      const Container = require('./containers/NewPersonalExpenseContainer').default
      cb(null, Container)
    }, 'NewPersonalExpense')
  }
})

