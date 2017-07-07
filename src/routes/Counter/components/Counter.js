import React, { Component } from 'react'
import PropTypes from 'prop-types'

class Counter extends Component {

  render () {
    const { counter, increment, doubleAsync, testFetch } = this.props
    return (
      <div style={{ margin: '0 auto' }} >
        <h2>Counter: {counter}</h2>
        <button className='btn btn-default' onClick={increment}>
          Increment
        </button>
        {' '}
        <button className='btn btn-default' onClick={doubleAsync}>
          Double (Async)
        </button>
        {' '}
        <button className='btn btn-default' onClick={testFetch}>
          Test fetch
        </button>
      </div>
    )
  }
}

Counter.propTypes = {
  counter     : PropTypes.number.isRequired,
  doubleAsync : PropTypes.func.isRequired,
  increment   : PropTypes.func.isRequired
}

export default Counter
