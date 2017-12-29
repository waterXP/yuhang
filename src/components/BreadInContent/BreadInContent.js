import React from 'react'
import PropTypes from 'prop-types'
import './BreadInContent.scss'

import { goLocation } from '@/lib/base'

const BreadInContent = ({ breadcrumbs }) => {
  const lastIndex = breadcrumbs.length - 1
  return <p className='yh-bread-in-content'>
    { breadcrumbs.map((v, i) => {
      const className = v.link || ''
      return <span
        className={className}
        key={v.key}
        onClick={v.link && (() => goLocation(v.link))}
      >
        { v.value }
        { i < lastIndex && <i className='fas fa-angle-right' /> }
      </span>
    })}
  </p>
}

BreadInContent.propTypes = {
  breadcrumbs: PropTypes.array
}

export default BreadInContent
