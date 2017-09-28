import React, { Component } from 'react'
import PropTypes from 'prop-types'
import './DevButtons.scss'

class DevButtons extends Component {
  static propTypes = {
    titles: PropTypes.array,
    handleClick: PropTypes.func
  }
  constructor() {
    super(...arguments)
    this.handleClick = this::this.handleClick
  }

  handleClick (id) {
    return () => this.props.handleClick(id)
  }

  render () {
    const { titles } = this.props
    return (
      <div className='wm-dev-button'>
        {
          titles.map((v, i) =>
            <input
              key={i}
              type='button'
              value={v}
              onClick={this.handleClick(i)} />
          )
        }
      </div>
    )
  }
}

export default DevButtons
