import React from 'react'
import PropTypes from 'prop-types'
import './FormCheckbox.scss'

import FormWarning from '../FormWarning'

const FormCheckbox = ({ label, link, name, checked, handleLink,
  handleChange, submited, disabled }) =>
    <div className='yh-form-checkbox'>
      <div className='content'>
        <label className={`label${disabled ? ' disabled' : ''}`}>
          <input
            type='checkbox'
            className='form-checkbox'
            name={name}
            checked={checked || false}
            onChange={handleChange}
            disabled={disabled}
          />
          { label }
        </label>
        { link &&
          <a
            className={`link${disabled ? ' disabled' : ''}`}
            onClick={() => {
              if (!disabled) {
                handleLink(name)
              }
            }}
            disabled={disabled}
          >
            { link }
          </a>
        }
        { submited && !checked &&
          <FormWarning text={`请勾选`} /> }
      </div>
    </div>

FormCheckbox.propTypes = {
  name: PropTypes.string,
  label: PropTypes.string,
  link: PropTypes.string,
  checked: PropTypes.bool,
  handleLink: PropTypes.func,
  handleChange: PropTypes.func,
  submited: PropTypes.bool,
  disabled: PropTypes.bool
}

export default FormCheckbox
