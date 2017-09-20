import React, { Component } from 'react'
import PropTypes from 'prop-types'
import ListButton from './ListButton'
import './ListButtons.scss'

class ListButtons extends Component {
  static propTypes = {
    btns: PropTypes.array.isRequired,
    clickHanlder: PropTypes.func
  }
  render () {
    const { btns, clickHandler } = this.props
    return (
      <ul className='wm-list-buttons'>
        {
          btns.map((v, i) => {
            return (
              <ListButton
                clickHandler={clickHandler}
                key={v.value || i}
                {...v}
              />
            )
          })
        }
      </ul>
    )
  }
}

export default ListButtons
