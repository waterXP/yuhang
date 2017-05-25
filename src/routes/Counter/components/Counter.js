import React, { Component } from 'react'
import PropTypes from 'prop-types'

class Counter extends Component {
  componentDidMount () {
    this.props.loader()
  }

  render () {
    const props = this.props
    return (
      <div style={{ margin: '0 auto' }} >
        <h2>Counter: {props.counter}</h2>
        <button className='btn btn-default' onClick={props.increment}>
          Increment
        </button>
        {' '}
        <button className='btn btn-default' onClick={props.doubleAsync}>
          Double (Async)
        </button>
        {' '}
        <button className='btn btn-default' onClick={props.testFetch}>
          Test fetch
        </button>
      </div>
    )
  }
}

Counter.propTypes = {
  counter     : PropTypes.number.isRequired,
  doubleAsync : PropTypes.func.isRequired,
  increment   : PropTypes.func.isRequired,
  loader: PropTypes.func.isRequired
}

export default Counter
