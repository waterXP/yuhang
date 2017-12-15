import React, { Component } from 'react'
import PropTypes from 'prop-types'
import './Step.scss'

class Step extends Component {
  static propTypes = {
    step: PropTypes.array,
    index: PropTypes.number
  }

  render () {
    const { step, index } = this.props
    return <div className='yh-step'>
        {
          step.map((v, i) =>
            <div
              key={v}
              className={
                i <= index
                  ? 'in-step'
                  : 'out-step'
              }
            >
              <p className='step'>{ i <= index ? ' ' : i }</p>
              <p className='text'>{ v }</p>
            </div>
          )
        }
      </div>
  }
}

export default Step
