import React from 'react'
import PropTypes from 'prop-types'
import './SendMessage.scss'

const SendMessage = ({ mail, tips }) =>
  <div className='yh-send-message'>
    <div className='content'>
      <p className='result'>
        验证邮件已发送到邮箱
        <span>{ mail }</span>
      </p>
      <p className='tips'>{ tips }</p>
    </div>
  </div>

SendMessage.propTypes = {
  mail: PropTypes.string,
  tips: PropTypes.string
}

export default SendMessage
