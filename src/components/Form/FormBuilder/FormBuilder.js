import React, { Component } from 'react'
import PropTypes from 'prop-types'
import './FormBuilder.scss'

import Form from '@/components/Form'

class FormBuilder extends Component {
  static propTypes = {
    items: PropTypes.array,
    unique: PropTypes.string,
    setValue: PropTypes.func,
    setChange: PropTypes.func,
    params: PropTypes.object,
    setTime: PropTypes.func,
    clock: PropTypes.number,
    handleLink: PropTypes.func,
    handleSubmit: PropTypes.func,
    wrongValidate: PropTypes.bool,
    submited: PropTypes.bool,
    disabled: PropTypes.bool
  }

  constructor () {
    super(...arguments)
    this.setValue = this::this.setValue
    this.state = { isDifferent: false }
  }

  setValue (e) {
    const { params } = this.props
    const { isDifferent } = this.state
    const { target } = e
    const { name, value, type } = target
    if (type === 'password') {
      const another = name === 'password' ? 'confirm' : 'password'
      if (value === params[another]) {
        this.setState({ isDifferent: false })
      } else if (!isDifferent) {
        this.setState({ isDifferent: true })
      }
    }
    this.props.setValue(e)
  }

  render () {
    const { items, unique, setValue, setChange, params, setTime,
      clock, handleLink, handleSubmit, submited, wrongValidate,
      disabled } = this.props
    const { isDifferent } = this.state
    const content = []
    items.forEach(v => {
      if (!v.unique || v.unique === unique) {
        switch (v.type) {
          case 'text':
          case 'password':
            content.push(
              <Form.Input
                key={v.key}
                label={v.text}
                name={v.key}
                type={v.type}
                value={params[v.key]}
                setValue={this.setValue}
                isRequired={v.isRequired}
                submited={submited}
                isDifferent={isDifferent}
                regStr={v.regStr}
                regFail={v.regFail}
                disabled={disabled}
              />
            )
            break
          case 'validate':
            content.push(
              <Form.Validate
                key={v.key}
                label={v.text}
                name={v.key}
                value={params[v.key]}
                setValue={setValue}
                isRequired={v.isRequired}
                handleClick={setTime}
                clock={clock}
                submited={submited}
                wrongValidate={wrongValidate}
                disabled={disabled}
              />
            )
            break
          case 'checkbox':
            content.push(
              <Form.Checkbox
                key={v.key}
                label={v.text}
                name={v.key}
                link={v.link}
                checked={params[v.key]}
                handleLink={handleLink}
                handleChange={setChange}
                submited={submited}
                disabled={disabled}
              />
            )
            break
          case 'submit':
            content.push(
              <Form.Submit
                key={v.key}
                value={v.text}
                handleSubmit={handleSubmit}
                submited={submited}
                disabled={disabled}
              />
            )
        }
      }
    })
    return <div className='yh-form-builder'>{ content }</div>
  }
}

export default FormBuilder
