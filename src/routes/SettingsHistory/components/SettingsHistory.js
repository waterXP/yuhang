import React, { Component } from 'react'
// import PropTypes from 'prop-types'
import SendHistoryList from '../../../components/SendHistoryList'
import './SettingsHistory.scss'

class SettingsHistory extends Component {
  // static propTypes = {
  //  //  SettingsHistory: PropTypes.func.isRequired,
  //  //  exampleArray: PropTypes.arrayOf(PropTypes.shape({
  //  //    homePage: PropTypes.bool,
  //  //    iconClass: PropTypes.string.isRequired,
  //  //    title: PropTypes.number,
  //  //    linkUrl: PropTypes.string.isRequired,
  //  //    btnType: PropTypes.string
  //  // }).isRequired).isRequired
  // }

  render () {
    const history = [{
      id: 33,
      date: 1333333,
      cash: 350,
      agent: '朱慧'
    }, {
      id: 34,
      date: 1333333,
      cash: 350,
      agent: '朱慧'
    }, {
      id: 57,
      date: 1333333,
      cash: 350,
      agent: '朱慧'
    }]
    return (
      <div className='wm-settings-history'>
        <SendHistoryList thead={true} datas={history} pathname='histroy/detail' />
        <SendHistoryList datas={history} pathname='histroy/detail' />
        <SendHistoryList datas={history} pathname='histroy/detail' />
      </div>
    )
  }
}

export default SettingsHistory

