import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { hashHistory, Router } from 'react-router'
import { Provider, connect } from 'react-redux'
import { inBusy } from '@/store/root'
import Loading from '@/components/Loading'

class AppContainer extends Component {
  static propTypes = {
    routes: PropTypes.object.isRequired,
    store: PropTypes.object.isRequired,
    isBusy: PropTypes.bool
  }
  render () {
    const { routes, store, isBusy } = this.props
    return (
      <Provider store={store}>
        <div style={{ height: '100%' }}>
          { isBusy && <Loading type='loading' cover /> }
          <Router history={hashHistory} children={routes} />
        </div>
      </Provider>
    )
  }
}

const mapStateToProps = (state) => ({
  isBusy: state.root.isBusy
})

const mapDispatchToProps = {
}

export default connect(mapStateToProps, mapDispatchToProps)(AppContainer)
