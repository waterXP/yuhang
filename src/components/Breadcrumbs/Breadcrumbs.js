import React from 'react'
import PropTypes from 'prop-types'
import './Breadcrumbs.scss'

const Breadcrumbs = ({ children }) =>
  <p className='yh-breadcrumbs'>{ children }</p>

Breadcrumbs.propTypes = {
  children: PropTypes.node
}

export default Breadcrumbs
