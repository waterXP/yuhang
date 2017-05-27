import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { hashHistory, Router } from 'react-router'
import { Provider } from 'react-redux'
import { connect } from 'react-redux'
import { getConfig } from '../store/root'

class AppContainer extends Component {
  static propTypes = {
    getConfig: PropTypes.func.isRequired,
    routes : PropTypes.object.isRequired,
    store  : PropTypes.object.isRequired
  }

  componentDidMount () {
    this.props.getConfig()
  }

  shouldComponentUpdate () {
    return false
  }

  render () {
    const { routes, store } = this.props
    return (
      <Provider store={store}>
        <div style={{ height: '100%' }}>
          <Router history={hashHistory} children={routes} />
        </div>
      </Provider>
    )
  }
}

const mapStateToProps = (state) => ({
})

const mapDispatchToProps = {
  getConfig
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(AppContainer)
