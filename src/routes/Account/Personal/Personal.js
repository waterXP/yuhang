import React, { Component } from 'react'
import PropTypes from 'prop-types'
import './Personal.scss'
import { getDate } from '@/lib/base'

import PersonalCondition from '../components/PersonalCondition'

import BreadInContent from '@/components/BreadInContent'
import TableGroup from '@/components/TableGroup'

class Personal extends Component {
  columns = [
    {
      key: 'id',
      name: '序号'
    }, {
      key: 'name',
      name: '姓名'
    }, {
      key: 'identity',
      name: '身份证号'
    }, {
      key: 'mail',
      name: '邮箱'
    }, {
      key: 'phone',
      name: '电话'
    }, {
      key: 'status',
      name: '当前状态',
      render: v => '待审核'
    }, {
      key: 'time',
      name: '申请时间',
      render: v => getDate(v.time)
    }, {
      key: 'control',
      name: '',
      render: v =>
        <button
          type='button'
          onClick={() => this.audit(v)}
          disabled={ this.props.isBusy }
        >
          审核
        </button>
    }
  ]

  static propTypes = {
    isBusy: PropTypes.bool
  }

  constructor () {
    super(...arguments)
    this.getList = this::this.getList
    this.setConditions = this::this.setConditions
    this.setValue = this::this.setValue
    this.audit = this::this.audit
    this.state = { identity: '', conditions: {} }
  }

  setConditions () {
    const { identity } = this.state
    this.setState({ conditions: { identity }}, this.getList(1))
  }
  getList (page, pageSize) {
    console.log(page, pageSize, this.state.conditions)
  }
  setValue (target, value) {
    this.setState({ [target]: value })
  }
  audit (target) {
    console.log(target)
  }

  render () {
    const { isBusy } = this.props
    const { identity } = this.state
    return <div className='yh-account-personal panel'>
      <BreadInContent
        breadcrumbs={
          [{
            key: 'account',
            value: '账号管理'
          }, {
            key: 'account-personal',
            value: '个人认证待审核'
          }]
        }
      />
      <PersonalCondition
        identity={identity}
        handleSubmit={this.setConditions}
        setValue={this.setValue}
        disabled={isBusy}
      />
      <TableGroup
        data={
          [
            {
              id: 1,
              name: '张三',
              identity: '3333',
              mail: 'a@bn.com',
              phone: '13444458787',
              status: 0,
              time: +new Date()
            }
          ]
        }
        columns={this.columns}
        page={8}
        total={77}
        pageSize={10}
        getList={this.getList}
        disabled={isBusy}
      />
    </div>
  }
}

export default Personal
