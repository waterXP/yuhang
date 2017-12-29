import React, { Component } from 'react'
import PropTypes from 'prop-types'

import Conditions from '@/components/Conditions'

class EnterpriseCondition extends Component {
  static propTypes = {
    company: PropTypes.string,
    handleSubmit: PropTypes.func,
    setValue: PropTypes.func,
    disabled: PropTypes.bool
  }

  render () {
    const { company, handleSubmit, setValue, disabled } = this.props
    return <div className='table-condition'>
      <Conditions.Input
        placeholder='请输入公司名称'
        value={company}
        onChange={({ target }) => setValue('company', target.value)}
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

export default EnterpriseCondition
