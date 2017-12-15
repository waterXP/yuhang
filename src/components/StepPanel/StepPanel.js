import React, { Component } from 'react'
import PropTypes from 'prop-types'
import './StepPanel.scss'

import Step from '../Step'

class StepPanel extends Component {
  static propTypes = {
    title: PropTypes.string,
    step: PropTypes.array,
    index: PropTypes.number,
    children: PropTypes.node
  }

  render () {
    const { children, title, step, index } = this.props
    return <div className='yh-step-panel'>
        { title && <p className='title'>{ title }</p> }
        <div className='content'>
          { step && step.length > 0 &&
              <Step step={step} index={index} />
          }
          { children }
        </div>
      </div>
  }
}

export default StepPanel
