import React, { Component } from 'react'
import PropTypes from 'prop-types'

import Conditions from '@/components/Conditions'

class PersonalCondition extends Component {
  static propTypes = {
    identity: PropTypes.string,
    handleSubmit: PropTypes.func,
    setValue: PropTypes.func,
    disabled: PropTypes.bool
  }

  render () {
    const { identity, handleSubmit, setValue, disabled } = this.props
    return <div className='table-condition'>
      <Conditions.Input
        placeholder='请输入入身份证号'
        value={identity}
        onChange={({ target }) => setValue('identity', target.value)}
        disabled={disabled}
      />
      <Conditions.Button
        text='查询'
        disabled={disabled}
        onClick={handleSubmit}
      />
    </div>
  }

}

export default PersonalCondition
