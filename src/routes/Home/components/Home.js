import React, { Component } from 'react'
import PropTypes from 'prop-types'
import DuckImage from '../assets/Duck.jpg'
import './Home.scss'

class Home extends Component {
  componentDidMount () {
    this.props.loader()
  }

  render () {
    return (
      <div>
        <h4>Welcome!</h4>
        <img
          alt='This is a duck, because Redux!'
          className='duck'
          src={DuckImage} />
      </div>
    )
  }
}

Home.propTypes = {
  loader: PropTypes.func.isRequired
}

export default Home
