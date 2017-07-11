import React from 'react'
import { Link } from 'react-router'

import './SearchForm.scss'

export const SearchForm = () => {
  const dirty = true
  return (
    <div className='wm-search-form'>
      <i className='fa fa-search' htmlFor='search' />
      <input
        type='text'
        id='search'
        placeholder='单号、备注、制单人、报销人'
        className={ `${!dirty && 'dirty'}` }
      />
      { dirty && <i className='fa fa-times-circle' /> }
      <Link to='/approval'>取消</Link>
    </div>
  )
}

export default SearchForm
