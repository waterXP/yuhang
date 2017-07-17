import React, { Component } from 'react'
import PropTypes from 'prop-types'
import './Account.scss'

class Account extends Component {
  static propTypes = {
    content: PropTypes.string.isRequired,
    type: PropTypes.number.isRequired
  }

  render () {
    let { content, type, chooseBankName } = this.props

    let length = content.length
    let marked = ''
    let hiddenControl = type === 2 ? 4 : 8
    let first = type === 2 ? 3 : 4
    let last = ''

    let isMail = content.indexOf('@') > 0
    if (isMail) {
      [first, last] = content.split('@')
      hiddenControl = first.length > 4 ? 4 : 1
      first = first.substr(0, hiddenControl)
        + new Array(first.length - hiddenControl + 1).join('*')
      marked = first + '@'
      marked += last || ''
    } else {
      if (length > 8) {
        marked = content.substr(0, first)
        let rest = length - first
        let count = ~~(rest / 4)

        last = rest % 4
        if (last === 0) {
          last = 4
          count--
        }
        marked += new Array(count + 1).join(' ****')
        marked += ' ' + content.substr(length - last)
      } else {
        marked = content.substr(0, 1)
          + new Array(content.length).join('*')
      }
    }

    return (
      <div className='wm-account'>
        <label>账号</label><h6>{chooseBankName}</h6>
      </div>
    )
  }
}

export default Account