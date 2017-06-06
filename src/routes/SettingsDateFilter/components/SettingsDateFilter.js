import React, { Component } from 'react'
import PropTypes from 'prop-types'
import FormButton from '../../../components/FormButton'
import './SettingsDateFilter.scss'

class SettingsDateFilter extends Component {
  static propTypes = {
   //  SettingsDateFilter: PropTypes.func.isRequired,
   //  exampleArray: PropTypes.arrayOf(PropTypes.shape({
   //    homePage: PropTypes.bool,
   //    iconClass: PropTypes.string.isRequired,
   //    title: PropTypes.number,
   //    linkUrl: PropTypes.string.isRequired,
   //    btnType: PropTypes.string
   // }).isRequired).isRequired
  }

  render () {
    const year = 2017
    const month = 3
    let months = []
    for (let i = 0; i < 12; i++) {
      months.push(
        <button key={i} className={'btn' + (month === i ? ' sel' : '')}>{i + 1}月</button>
      )
    }
    return (
      <div className='wm-settings-date-filter'>
        <div className='year-filter'>
          <p className='topic'><span className='fa fa-circle'></span>&nbsp;年份</p>
          <button className='btn'>&nbsp;{year}年<span className='pull-right'>&gt;</span></button>
        </div>
        <div className='month-filter'>
          <p className='topic'><span className='fa fa-circle'></span>&nbsp;月份</p>
          {months}
        </div>
        <FormButton text='确认' />
      </div>
    )
  }
}

export default SettingsDateFilter

