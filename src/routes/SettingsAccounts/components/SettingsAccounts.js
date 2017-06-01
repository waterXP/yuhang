import React, { Component } from 'react'
import PropTypes from 'prop-types'

class SettingsAccounts extends Component {
  static propTypes = {
    getAccounts: PropTypes.func.isRequired
   //  SettingsAccounts: PropTypes.func.isRequired,
   //  exampleArray: PropTypes.arrayOf(PropTypes.shape({
   //    homePage: PropTypes.bool,
   //    iconClass: PropTypes.string.isRequired,
   //    title: PropTypes.number,
   //    linkUrl: PropTypes.string.isRequired,
   //    btnType: PropTypes.string
   // }).isRequired).isRequired
  }

  componentDidMount () {
    this.props.getAccounts()
  }

  render () {
    return (
      <div><h1>TESTTESTTEST</h1></div>
    )
  }
}

export default SettingsAccounts

