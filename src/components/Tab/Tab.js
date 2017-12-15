import React, { Component } from 'react'
import PropTypes from 'prop-types'
import './Tab.scss'

const Tab = ({ list, active, changeTab }) =>
  <ul className='yh-tab'>
    {
      list.map((v, i) =>
        <li
          key={v.key}
          className={active === v.key ? 'active' : ''}
          onClick={() => changeTab(v)}
        >
          { v.value }
        </li>)
    }
  </ul>

Tab.propTypes = {
  list: PropTypes.array,
  active: PropTypes.string,
  changeTab: PropTypes.func
}

export default Tab
