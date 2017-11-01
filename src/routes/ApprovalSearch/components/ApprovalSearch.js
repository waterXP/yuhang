import React, { Component } from 'react'
import PropTypes from 'prop-types'
import './ApprovalSearch.scss'

import SearchForm from '@/components/SearchForm'
import ApprovalList from '@/components/ApprovalList'
import { dingSetTitle, dingSetNavRight } from '@/lib/ddApi'

class ApprovalSearch extends Component {
  static propTypes = {
    list: PropTypes.arrayOf(PropTypes.shape({
      expensesClaimsId: PropTypes.number.isRequired,
      createdAvatar: PropTypes.string.isRequired,
      sumMoney: PropTypes.number.isRequired,
      createdBy: PropTypes.string.isRequired,
      userName: PropTypes.string.isRequired,
      statusName: PropTypes.string.isRequired,
      submitTime: PropTypes.string
    }).isRequired).isRequired,
    page: PropTypes.shape({
      current_page: PropTypes.number,
      total_page: PropTypes.number
    }).isRequired,
    getList: PropTypes.func.isRequired,
    cleanList: PropTypes.func.isRequired,
    isBusy: PropTypes.bool.isRequired,
    inBusy: PropTypes.func.isRequired,
    query: PropTypes.object.isRequired
  }

  constructor (props) {
    super(props)
    this.state = {
      dirty: false,
      search: ''
    }
    this.scrolled = this::this.scrolled
    this.getResult = this::this.getResult
    this.cancel = this::this.cancel
    this.getList = this::this.getList
  }

  componentDidMount () {
    this.props.cleanList()
    let { status } = this.props.query
    status = +status
    switch (status) {
      case 1 :
        dingSetTitle('待我审批')
        break
      case 2:
        dingSetTitle('我发起的')
        break
      case 3:
        dingSetTitle('抄送我的')
        break
      case 4:
        dingSetTitle('我已审批')
        break
      default:
        dingSetTitle('明快报销')
    }
    dingSetNavRight('')
    // dingSetMenu(
    //   [{
    //     id: 'cancel',
    //     text: '取消'
    //   }],
    //   this.cancel
    // )
  }
  cancel () {
    window.history.back()
  }
  scrolled (e) {
    const { inBusy, isBusy, page, query, getList } = this.props
    const { search } = this.state
    if (!isBusy) {
      inBusy(true)
      getList(+query.status || 1, { search, current_page: page.next_page })
    }
  }

  getResult (value) {
    if (value) {
      this.getList(value)
      // const { getList, inBusy, query } = this.props
      // inBusy(true)
      // this.setState({ search: value })
      // getList(+query.status, {
      //   search: value,
      //   current_page: 1
      // })
      // this.setState({
      //   dirty: true
      // })
    } else {
      this.setState({
        dirty: false
      })
    }
  }

  getList (value) {
    // toast(1)
    const search = value === undefined
      ? this.state.search
      : value
    // const { search } = this.state
    if (value !== undefined) {
      this.setState({ search: value })
    }
    // toast(search)
    if (search) {
      const { getList, inBusy, query, cleanList } = this.props
      inBusy(true)
      cleanList()
      getList(+query.status, {
        search,
        current_page: 1
      })
      this.setState({
        dirty: true
      })
    }
  }

  render () {
    const { inBusy, isBusy, list, query, page } = this.props
    let pageEnd = true
    if (page.current_page &&
      page.total_page &&
      page.current_page < page.total_page) {
      pageEnd = false
    }
    const { dirty, search } = this.state
    return (
      <div className='wm-approval-search'>
        <SearchForm
          inBusy={inBusy}
          submitHandler={this.getResult}
          placeholder='报销单号、报销人、制单人、备注'
          cancelHandler={this.cancel}
        />
        { dirty && <ApprovalList
            list={list}
            tag={+query.status || 1}
            handlerScroll={this.scrolled}
            pageEnd={pageEnd}
            isBusy={isBusy}
            inSearch
            keyword={search}
            handleInitial={this.getList}
            loaded={page['current_page'] !== undefined}
          />
        }
      </div>
    )
  }
}

export default ApprovalSearch
