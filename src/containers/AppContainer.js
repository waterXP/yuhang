import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { hashHistory, Router } from 'react-router'
import { Provider, connect } from 'react-redux'
import { getConfig, inBusy } from '@/store/root'
import { setEvent } from '@/lib/base'
import NoData from '@/components/NoData'

class AppContainer extends Component {
  static propTypes = {
    getConfig: PropTypes.func.isRequired,
    routes: PropTypes.object.isRequired,
    store: PropTypes.object.isRequired,
    inBusy: PropTypes.func.isRequired,
    isBusy: PropTypes.bool,
    location: PropTypes.object
  }

  componentDidMount () {
    const { inBusy, getConfig, location } = this.props
    setEvent(location.pathname)
    inBusy()
    getConfig()
  }

  shouldComponentUpdate (nextProps, nextState) {
    if (this.props.isBusy !== nextProps.isBusy) {
      return true
    }
    return false
  }

  render () {
    const { routes, store, isBusy } = this.props
    return (
      <Provider store={store}>
        <div style={{ height: '100%' }}>
          { isBusy && <NoData type='loading' cover /> }
          <Router history={hashHistory} children={routes} />
        </div>
      </Provider>
    )
  }
}

const mapStateToProps = (state) => ({
  isBusy: state.root.isBusy,
  location: state.location
})

const mapDispatchToProps = {
  getConfig,
  inBusy
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(AppContainer)
