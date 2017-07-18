import { combineReducers } from 'redux'
import rootReducer from './root'
import locationReducer from './location'
import footerReducer from './footer'
import { reducer as reduxFormReducer } from 'redux-form'

export const makeRootReducer = (asyncReducers) => {
  return combineReducers({
    root: rootReducer,
    location: locationReducer,
    footer: footerReducer,
    form: reduxFormReducer,
    ...asyncReducers
  })
}

export const injectReducer = (store, { key, reducer }) => {
  if (Object.hasOwnProperty.call(store.asyncReducers, key)) return

  store.asyncReducers[key] = reducer
  store.replaceReducer(makeRootReducer(store.asyncReducers))
}

export default makeRootReducer
