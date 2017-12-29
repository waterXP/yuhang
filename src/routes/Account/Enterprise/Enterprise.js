import React, { Component } from 'react'
import PropTypes from 'prop-types'
import './Enterprise.scss'
import { getDate } from '@/lib/base'

import EnterpriseCondition from '../components/EnterpriseCondition'

import BreadInContent from '@/components/BreadInContent'
import TableGroup from '@/components/TableGroup'

class Enterprise extends Component {
  columns = [
    {
      key: 'id',
      name: '序号'
    }, {
      key: 'company',
      name: '公司名称'
    }, {
      key: 'address',
      name: '工作地点'
    }, {
      key: 'contact',
      name: '联系人'
    }, {
      key: 'phone',
      name: '联系电话'
    }, {
      key: 'code',
      name: '社会信用代码'
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
    this.state = { company: '', conditions: {} }
  }

  setConditions () {
    const { company } = this.state
    this.setState({ conditions: { company }}, this.getList(1))
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
    const { company } = this.state
    return <div className='yh-account-enterprise panel'>
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
      <EnterpriseCondition
        company={company}
        handleSubmit={this.setConditions}
        setValue={this.setValue}
        disabled={isBusy}
      />
      <TableGroup
        data={
          [
            {
              id: 1,
              company: '张三公司',
              address: '3333',
              contact: 'a@bn.com',
              phone: '13444458787',
              code: '99879879dfa',
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

export default Enterprise
