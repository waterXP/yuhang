import React, { Component } from 'react'
import PropTypes from 'prop-types'
import './Pagination.scss'

import { pageSizeGroup, showPages } from '@/lib/enums'

class Pagination extends Component {
  static propTypes = {
    page: PropTypes.number,
    pageSize: PropTypes.number,
    total: PropTypes.number,
    setPageSize: PropTypes.func,
    changePage: PropTypes.func,
    disabled: PropTypes.bool
  }

  constructor () {
    super(...arguments)
    this.handleBlur = this::this.handleBlur
    this.keyPress = this::this.keyPress
    this.setPage = this::this.setPage
    this.state = { inputPage: '' }
  }

  componentWillMount () {
    this.setState({
      inputPage: '' + this.props.page
    })
  }
  componentDidUpdate (prevProps, prevState) {
    const { page } = this.props
    if (page !== prevProps.page) {
      this.setPage()
    }
  }
  setPage () {
    const { page } = this.props
    this.setState({ inputPage: '' + page })
  }
  handleBlur ({ target }) {
    const value = +target.value
    const { total, page, pageSize, changePage } = this.props
    const totalPage = Math.ceil(total / pageSize)
    if (value !== page) {
      if (value < page || value > totalPage || isNaN(value)) {
        this.setState({ inputPage: '' + page })
      } else {
        changePage(value)
      }
    }
  }
  keyPress ({ key, target }) {
    if (key === 'Enter') {
      target.blur()
    }
  }

  render () {
    const { page, pageSize, total, setPageSize, changePage, disabled
      } = this.props
    const { inputPage } = this.state
    const totalPage = Math.ceil(total / pageSize)
    const _showPages = totalPage < showPages ? totalPage : showPages
    const pages = [page]
    let step = 1
    while (pages.length < _showPages) {
      let target = page + step
      if (target <= totalPage) {
        pages.push(target)
      }
      if (pages.length < _showPages) {
        target = page - step
        if (target > 0) {
          pages.unshift(target)
        }
      }
      step++
    }
    const centerPage = pages[Math.floor(pages.length / 2)]
    return <div className='yh-pagination'>
      <span>共&nbsp;{ totalPage }&nbsp;页</span>
      <select
        value={pageSize}
        onChange={({ target }) => setPageSize(+target.value)}
        disabled={disabled}
      >
        {
          pageSizeGroup.map(v =>
            <option key={v} value={v}>{ v }&nbsp;条/页</option>
          )
        }
      </select>
      <ul>
        <li>
          <button
            type='button'
            disabled={disabled || page === 1}
            onClick={() => changePage(page - 1)}
          >
            上一页
          </button>
        </li>
        { pages[0] > 1 &&
          <li>
            <button
              type='button'
              disabled={disabled}
              onClick={() => changePage(centerPage - showPages < 1
                ? 1
                : centerPage - showPages
              )}
            >
              ...
            </button>
          </li>
        }
        {
          pages.map(v =>
            <li key={v}>
              <button
                className={page === v ? 'current-page' : ''}
                type='button'
                disabled={disabled || page === v}
                onClick={() => changePage(v)}
              >
                { v }
              </button>
            </li>)
        }
        { pages[pages.length - 1] < totalPage &&
          <li>
            <button
              type='button'
              disabled={disabled}
              onClick={() => changePage(centerPage + showPages > totalPage
                ? totalPage
                : centerPage + showPages
              )}
            >
              ...
            </button>
          </li>
        }
        <li>
          <button
            type='button'
            disabled={disabled || page === totalPage}
            onClick={() => changePage(page + 1)}
          >
            下一页
          </button>
        </li>
      </ul>
      <span>
        前往&nbsp;
        <input
          type='text'
          className='page-jump'
          onBlur={this.handleBlur}
          onChange={({ target }) => this.setState({ inputPage: target.value })}
          onKeyPress={this.keyPress}
          disabled={disabled}
          value={inputPage}
        />
        &nbsp;页
      </span>
    </div>
  }
}

export default Pagination
