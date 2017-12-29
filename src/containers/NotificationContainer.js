import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import './Notification.scss'

import Toast from '../components/Toast'
import { closeToast } from '../store/root'

class Notification extends Component {
  static propTypes = {
    toasts: PropTypes.array,
    closeToast: PropTypes.func
  }

  render () {
    const { toasts, closeToast } = this.props
    return <div className='yh-notification'>
      { toasts.map(v =>
        <Toast
          key={v.key}
          type={v.style}
          text={v.text}
          title={v.title}
          handleClose={() => closeToast(v)}
        />
      )}
    </div>
  }
}

const mapStateToProps = state => ({
  toasts: state.root.toasts
})
const mapDispatchToProps = {
  closeToast
}

export default connect(mapStateToProps, mapDispatchToProps)(Notification)
