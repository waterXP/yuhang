import React, { Component } from 'react'
import PropTypes from 'prop-types'
import './TimerButton.scss'

class TimerButton extends Component {
  static propTypes = {
    handleClick: PropTypes.func
  }

  constructor () {
    super(...arguments)
    this.handleClick = this::this.handleClick
    this.startTimer = this::this.startTimer
    this.state = { clock: 0, tm: 0 }
  }

  componentWillUnmount () {
    const { tm } = this.state
    tm && clearTimeout(tm)
  }

  handleClick () {
    const { clock } = this.state
    if (clock) {
      return
    }
    this.startTimer(60)
    this.props.handleClick()
  }
  startTimer (seconds) {
    this.setState(
      ({ clock }) => {
        return ({ clock: seconds || (clock - 1) })
      }, () => {
        if (this.state.clock > 0) {
          this.setState({
            tm: setTimeout(this.startTimer, 1000)
          })
        }
      }
    )
  }

  render () {
    const { clock } = this.state
    return <button
      className={`yh-timer-button${clock ? ' disabled' : ''}`}
      type='button'
      onClick={!clock && this.handleClick}
    >
      { clock ? `重新发送(${clock})`  : '发送验证码' }
    </button>
  }
}

export default TimerButton
