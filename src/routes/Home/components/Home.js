import React, { Component } from 'react'
import PropTypes from 'prop-types'
import DuckImage from '../assets/Duck.jpg'
import './Home.scss'

class Home extends Component {
  static propTypes = {
    getConfig: PropTypes.func.isRequired
  }

  componentDidMount () {
    this.props.getConfig();
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
}

export default Home
