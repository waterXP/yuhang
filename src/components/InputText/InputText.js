import React, { Component } from 'react'
import PropTypes from 'prop-types'

import './InputText.scss'

class InputText extends Component {
  static propTypes = {
    value: PropTypes.string,
    setValue: PropTypes.func,
    tyep: PropTypes.string
  }

  render () {
    const { value, setValue, type, placeholder } = this.props
    return <input
        className='yh-input-text'
        type={type || 'text'}
        value={value}
        placeholder={placeholder}
        onChange={({ target }) => setValue(target.value)}
      />
  }
}

export default InputText
