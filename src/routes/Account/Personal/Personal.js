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
          disabled={this.props.isBusy}
        >
          审核
        </button>
    }
  ]

  static propTypes = {
    isBusy: PropTypes.bool,
    list: PropTypes.array,
    page: PropTypes.number,
    pageSize: PropTypes.number,
    total: PropTypes.number,
    getList: PropTypes.func,
    clearList: PropTypes.func,
    audit: PropTypes.func
  }

  constructor () {
    super(...arguments)
    this.getList = this::this.getList
    this.setConditions = this::this.setConditions
    this.setValue = this::this.setValue
    this.audit = this::this.audit
    this.state = { identity: '', conditions: {} }
  }

  componentWillMount () {
    this.getList(1)
  }
  componentWillUnmount () {
    this.props.clearList()
  }

  setConditions () {
    const { identity } = this.state
    this.setState({ conditions: { identity } }, () => this.getList(1))
  }
  getList (page, pageSize) {
    const { conditions } = this.state
    this.props.getList(
      'get /person/list',
      {
        page,
        pageSize: pageSize || this.props.pageSize,
        idCardNum: conditions.identity
      }
    )
  }
  setValue (target, value) {
    this.setState({ [target]: value })
  }
  audit (target) {
    this.props.audit(target.id)
  }

  render () {
    const { isBusy, list, page, pageSize, total } = this.props
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
        data={list}
        columns={this.columns}
        page={page}
        total={total}
        pageSize={pageSize}
        getList={this.getList}
        disabled={isBusy}
      />
    </div>
  }
}

export default Personal
