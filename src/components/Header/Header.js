import React from 'react'
import PropTypes from 'prop-types'
import { Button } from '../Button'
import './Header.scss'

export const Header = (props) => (
  <header className='header'>
    <h3>{props.title}</h3>
    {props.btns.map((btn, i) =>
      <Button key={i} {...btn} />
    )}
  </header>
)

Header.propTypes = {
  btns: PropTypes.arrayOf(PropTypes.shape({
    url: PropTypes.string,
    onClick: PropTypes.func,
    text: PropTypes.string.isRequired,
    style: PropTypes.string
  }).isRequired).isRequired,
  title: PropTypes.string.isRequired
}

export default Header
