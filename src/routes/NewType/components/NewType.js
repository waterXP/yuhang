import React, { Component } from 'react'
import PropTypes from 'prop-types'
import './NewType.scss'
import { dingSetTitle, goLocation } from '@/lib/base'

class NewType extends Component {
  static propTypes = {
    step: PropTypes.string,
    costTypes: PropTypes.array,
    setAppCatch: PropTypes.func,
    appCatch: PropTypes.object
  }
  constructor () {
    super(...arguments)
    this.state = {
      currentPaths: [],
      paths: [],
      inSearch: false
    }
    this.getParents = this::this.getParents
    this.toggleSearch = this::this.toggleSearch
    this.getPaths = this::this.getPaths
  }

  componentDidMount () {
    dingSetTitle('费用类型选择')
    const { costTypes, appCatch } = this.props
    const { index, costTypeId } = appCatch
    const { step } = this.props

    // check index & store
    if (index === undefined || step !== 'set cost type') {
      goLocation('/new')
      return
    }

    if (costTypeId) {
      // initial cost info to state when has costTypeId from store
      this.getPaths(costTypes, +costTypeId, [])
    }
  }
  getPaths (list, targetId, paths) {
    list.forEach((v) => {
      if (v.id === targetId) {
        this.setState({
          paths: [...paths],
          currentPaths: [...paths]
        })
      } else {
        if (v.childs) {
          this.getPaths(v.childs, targetId, [...paths, v.id])
        }
      }
    })
  }

  toggleSearch () {
    if (this.state.inSearch) {
      this.keyword.value = ''
    }
    this.setState((prevState, props) => ({ inSearch: !prevState.inSearch }))
  }
  getSearchList (list, origin, paths, keyword) {
    origin.forEach((v) => {
      if (v.childs) {
        this.getSearchList(list, v.childs, [...paths, v.id], keyword)
      } else {
        if (v.name.indexOf(keyword) > -1) {
          list.push({
            id: v.id,
            name: v.name,
            paths
          })
        }
      }
    })
  }

  setType (costTypeId, costTypeName) {
    this.props.setAppCatch({
      index: this.props.appCatch.index,
      costTypeId,
      costTypeName
    })
    goLocation('/new')
  }
  getChildren (id) {
    this.setState(({ currentPaths }) => {
      return { currentPaths: [...currentPaths, id] }
    })
  }
  getParents () {
    this.setState(({ currentPaths }) => {
      if (currentPaths && currentPaths.length > 0) {
        currentPaths.pop()
      }
      return { currentPaths }
    })
  }

  handleSelect (costTypeId, costTypeName) {
    return this.setType.bind(this, costTypeId, costTypeName)
  }
  handleGetChildren (id) {
    return this.getChildren.bind(this, id)
  }

  render () {
    const { costTypes, appCatch } = this.props
    const { inSearch, paths, currentPaths } = this.state
    const { costTypeId } = appCatch || 0

    let list = []
    if (inSearch) {
      this.getSearchList(list, costTypes, [], this.keyword.value)
    } else {
      list = costTypes
      if (currentPaths.length > 0) {
        currentPaths.forEach((parentId) => {
          list = (list.find((v) => v.id === parentId)).childs
        })
      }
    }

    return (
      <div className='wm-new-type'>
        <div className='search'>
          <i className='fa fa-search' />
          <input type='text' ref={(e) => { this.keyword = e }} />
          <button type='button' onClick={this.toggleSearch}>
            { inSearch ? '取消' : '搜索' }
          </button>
        </div>
        <ul>
          { currentPaths.length > 0 &&
            !inSearch &&
            <li
              onClick={this.getParents}
              className='return'
            >
              返回上级
              <i className='fa fa-reply' />
            </li>
          }
          { list && list.length > 0 && list.map((v) => {
            if (inSearch) {
              return (
                <li
                  key={`s-${v.id}`}
                  onClick={this.handleSelect(v.id, v.name)}
                  className={`${costTypeId === v.id ? 'active' : ''}`}
                >
                  { v.name }
                </li>
              )
            } else {
              return (
                <li
                  key={v.id}
                  onClick={v.childs
                    ? this.handleGetChildren(v.id)
                    : this.handleSelect(v.id, v.name)
                  }
                  className={
                    `${
                      costTypeId === v.id ||
                      paths[currentPaths.length] === v.id
                        ? 'active'
                        : ''
                    }`
                  }
                >
                  { v.name }{ v.childs && <i className='fa fa-angle-right wm-color-secondary' /> }
                </li>
              )
            }
          })}
        </ul>
      </div>
    )
  }
}

export default NewType
