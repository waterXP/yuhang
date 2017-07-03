import React from 'react'
import PropTypes from 'prop-types'
import FormLink from '../FormLink'

export const ExpenseAttachment = (props) => {
  return (
    <FormLink
      name='attachment'
      text='附件'
      icon='fa-paperclip wm-color-secondary' />
  )
}

export default ExpenseAttachment
