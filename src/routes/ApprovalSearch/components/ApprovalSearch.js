import React, { Component } from 'react'
import PropTypes from 'prop-types'
import './ApprovalSearch.scss'

import SearchForm from '@/components/SearchForm'
import Cover from '@/components/Cover'

class ApprovalSearch extends Component {
  static propTypes = {
   //  ApprovalSearch: PropTypes.func.isRequired,
   //  exampleArray: PropTypes.arrayOf(PropTypes.shape({
   //    homePage: PropTypes.bool,
   //    iconClass: PropTypes.string.isRequired,
   //    title: PropTypes.number,
   //    linkUrl: PropTypes.string.isRequired,
   //    btnType: PropTypes.string
   // }).isRequired).isRequired
  }

  render () {
    return (
      <div className='wm-approval-search'>
        <SearchForm />
        <Cover />
      </div>
    )
  }
}

export default ApprovalSearch

