import React, { Component } from 'react'
import { connect } from 'react-redux'
import { FieldArray, reduxForm, initialize, formValueSelector } from 'redux-form'
import PropTypes from 'prop-types'
import ExpenseUserInfo from '../ExpenseUserInfo'
import ExpenseDetailInfo from '../ExpenseDetailInfo'
import ExpenseAccountInfo from '../ExpenseAccountInfo'
import ExpenseAttachment from '../ExpenseAttachment'
import ConfirmButton from '../ConfirmButton'
import FormButton from '../FormButton'
import FormTextArea from '../FormTextArea'
import { fetchData, toast } from '@/lib/base'
import './ExpenseForm.scss'

const renderDetails = ({ fields }) => {
  return (
    <div>
      {fields && fields.map((v, i) =>
        <ExpenseDetailInfo
         key={i}
         data={v}
         deleteHandler={() => fields.remove(i)} />
      )}
      <ConfirmButton
        text=' 增加明细'
        icon='fa-plus'
        handleClick={() =>  fields.push({})} />
    </div>
  )
}

class ExpenseForm extends Component {
  componentDidMount () {
    this.initial()
  }

  initial () {
    Promise.all([
      fetchData('get /expensesClaims/init.json'),
      fetchData('get /userAccounts/myAccountList.json')
    ])
    .then(([d1, d2]) => {
      if (!d1.result || !d2.result) {
        const { userName, deptsList } = d1.data
        this.props.dispatch(
          initialize('expenseForm', {
            userName,
            accounts: d2.data,
            selDept: 0,
            deptName: '请选择(必须)',
            deptsList,
            details: [{}]
          })
        )
      }
    })
  }

  departChange () {
    console.log(this.props.deptsList)
  }

  render () {
    const { handleSubmit, userName, deptName, totalCash } = this.props
    const testUserInfo = {
      defaultValue: { type: 'text', text: '请选择(必须)' },
      departments: {
        '1': {
          type: 'text',
          text: '费用系统项目部'
        }, '2':  {
          type: 'text',
          text: '财务部'
        }
      }
    }
    return (
      <form className='wm-expense-form' onSubmit={ handleSubmit }>
        <ExpenseUserInfo deptName={ deptName } name={ userName } departChange={ this.departChange.bind(this) } />
        <FieldArray name='details' component={ renderDetails } />
        <ExpenseAccountInfo totalCash={ totalCash() } />
        <ExpenseAttachment />
        <FormTextArea
          name='auditor'
          placeholder='审批人' />
        <FormTextArea
          name='cc'
          placeholder='抄送人' />
        <FormButton text='存草稿' />
        <FormButton
          type='submit'
          text='提交'/>
      </form>
    )    
  }
}

const selector = formValueSelector('expenseForm')

export default connect(
  state => ({
    userName: selector(state, 'userName'),
    deptName: selector(state, 'deptName'),
    totalCash: () => {
      let totalCash = 0
      let details = selector(state, 'details')
      if (details) {
        details.forEach((v) => {
          if (!isNaN(+v.cash)) {
            totalCash += +v.cash
          }
        })
      }
      return totalCash
    },
    deptsList: selector(state, 'deptsList'),
    initialValues: { details: [{}] }
  })
)(reduxForm({
  form: 'expenseForm'
})(ExpenseForm))
