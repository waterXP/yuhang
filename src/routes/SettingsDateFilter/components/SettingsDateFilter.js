import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { goLocation } from '@/lib/base'
import Filter from '@/components/Filter'
import FormButton from '@/components/FormButton'
import './SettingsDateFilter.scss'

class SettingsDateFilter extends Component {
  static propTypes = {
    filter: PropTypes.shape({
      years: PropTypes.arrayOf(PropTypes.number),
      year: PropTypes.number,
      month: PropTypes.number
    }).isRequired,
    cleanFilter: PropTypes.func.isRequired,
    selMonth: PropTypes.func.isRequired,
    selYear: PropTypes.func.isRequired,
    toggleYears: PropTypes.func.isRequired,
    changeYears: PropTypes.func.isRequired
  }

  componentDidMount() {
    this.props.cleanFilter()
  }

  render () {
    let selYears = []
    const { selMonth, selYear, toggleYears, changeYears, monthFilter } = this.props
    let { month, year, years, showYears } = this.props.filter
    if (showYears) {
      years.forEach((aYear) => {
        selYears.push(
          <button
            key={aYear}
            type='button'
            onClick={selYear.bind(this, aYear)}
            className={'btn' + (year === aYear ? ' sel' : '')}>
            {aYear}年
          </button>
        )
      })
    }

    return (
      <div className='wm-settings-date-filter'>
        <div className='year-filter'>
          <p className='topic'><span className='fa fa-circle' />&nbsp;年份</p>
          <button className='btn' onClick={ toggleYears.bind(this) }>&nbsp;{year}年<span className='pull-right'>&gt;</span></button>
        </div>
        { showYears && <div className='years-filter'>
          <button className='btn change-years left' onClick={ changeYears.bind(this, -9) }>
            <i className='fa fa-arrow-left'><span className='sr-only'>prev years</span></i>
          </button>
          <div className='years'>{ selYears }</div>
          <button className='btn change-years right' onClick={ changeYears.bind(this, 9) }>
            <i className='fa fa-arrow-right'><span className='sr-only'>next years</span></i>
            </button>
        </div> }
        <Filter
          title='月份'
          conditions={ monthFilter }
          clickHandler={ selMonth }
        />
        <FormButton
          onClick={ goLocation.bind(this, {
            pathname: 'settings/history',
            query: {
              year: year,
              month: month
            }
          }) }
          text='确认' />
      </div>
    )
  }
}

export default SettingsDateFilter

