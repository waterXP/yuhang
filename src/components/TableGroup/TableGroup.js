import React, { Component } from 'react'
import PropTypes from 'prop-types'
import './TableGroup.scss'

import Table from '../Table'
import Pagination from '../Pagination'

class TableGroup extends Component {
  static propTypes = {
    data: PropTypes.array,
    columns: PropTypes.array,
    page: PropTypes.number,
    pageSize: PropTypes.number,
    total: PropTypes.number,
    getList: PropTypes.func,
    disabled: PropTypes.bool
  }

  constructor () {
    super(...arguments)
    this.setPageSize = this::this.setPageSize
    this.changePage = this::this.changePage
  }

  setPageSize (pageSize) {
    this.props.getList(1, pageSize)
  }
  changePage (page) {
    this.props.getList(page)
  }

  render () {
    const { data, columns, page, pageSize, total, disabled } = this.props
    return <div className='yh-table-group'>
      <Table columns={columns} data={data} />
      <Pagination
        page={page}
        pageSize={pageSize}
        total={total}
        setPageSize={this.setPageSize}
        changePage={this.changePage}
        disabled={disabled}
      />
    </div>
  }
}

export default TableGroup
