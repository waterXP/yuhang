import React, { Component } from 'react'
import PropTypes from 'prop-types'
import SearchForm from '@/components/SearchForm'
import NoData from '@/components/NoData'
import './NewType.scss'
import { goLocation, getHighLightText, goBack } from '@/lib/base'
import { dingSetTitle, dingSetNavRight } from '@/lib/ddApi'

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
      inSearch: false,
      isBusy: false,
      keyword: '',
      opened: {}
    }
    this.inputSearch = this::this.inputSearch
    this.getPaths = this::this.getPaths
    this.inBusy = this::this.inBusy
    this.handleToggle = this::this.handleToggle
    this.buildList = this::this.buildList
    this.cancelSearch = this::this.cancelSearch
  }

  componentDidUpdate () {
    dingSetTitle('费用类型选择')
    dingSetNavRight('')
  }

  componentDidMount () {
    const { costTypes, appCatch } = this.props
    const { index, costTypeId } = appCatch
    const { step } = this.props

    // check index & store
    if (index === undefined || step !== 'set cost type') {
      goLocation('/')
      return
    }

    if (costTypeId) {
      // initial cost info to state when has costTypeId from store
      this.getPaths(costTypes, +costTypeId, [])
    }
  }

  inBusy (isBusy = true) {
    this.setState({ isBusy })
  }

  // initial paths for opened && active item
  getPaths (list, targetId, paths) {
    list.forEach((v) => {
      if (v.id === targetId) {
        let opened = {}
        paths.forEach((v) => opened[v] = true)
        this.setState({
          opened
        })
      } else {
        if (v.childs) {
          this.getPaths(v.childs, targetId, [...paths, v.id])
        }
      }
    })
  }

  // search keyword
  inputSearch (keyword) {
    const inSearch = keyword ? true : false
    this.setState({ inSearch, keyword })
  }
  cancelSearch () {
    this.setState({
      keyword: '',
      inSearch: false
    })
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

  // click handle
  setType (costTypeId, costTypeName, e) {
    e.stopPropagation()
    this.props.setAppCatch({
      index: this.props.appCatch.index,
      costTypeId,
      costTypeName
    })
    goBack()
  }
  handleSelect (costTypeId, costTypeName) {
    return this.setType.bind(this, costTypeId, costTypeName)
  }
  handleToggle (id) {
    return (e) => {
      e.stopPropagation()
      return this.setState((prevState) =>
        ({ opened: Object.assign(
          {},
          prevState.opened,
          { [id]: !prevState.opened[id] }
        ) })
      )
    }
  }

  // build cost type list
  buildList (list, i) {
    const { costTypes, appCatch } = this.props
    const { opened } = this.state
    const { costTypeId } = appCatch || 0
    return list.map((v) =>
      <li
        key={v.id}
        onClick={v.childs
          ? this.handleToggle(v.id)
          : this.handleSelect(v.id, v.name)}
      >
        <div className={`level-${i}${costTypeId === v.id ? ' active' : ''}`}>
          <div className='type-info'>
            <span className='name'>{v.name}</span>
            { v.childs &&
              <img
                className={`icon${opened[v.id] ? ' opened' : ''}`}
                src={`${opened[v.id] ? 'imgs/icon_arrow_2.png' : 'imgs/icon_arrow.png'}`}
              />
            }
          </div>
        </div>
        { v.childs && opened[v.id] &&
          <ul>{ this.buildList(v.childs, i + 1) }</ul>
        }
      </li>
    )
  }

  render () {
    const { costTypes, appCatch } = this.props
    const { inSearch, keyword, isBusy } = this.state
    const { costTypeId } = appCatch || 0
    let list = []
    if (inSearch) {
      this.getSearchList(list, costTypes, [], keyword)
    } else {
      list = costTypes
    }
    return (
      <div className='wm-new-type'>
        <div className='search'>
          { <SearchForm
              inBusy={this.inBusy}
              submitHandler={this.inputSearch}
              placeholder='搜索费用或关键词'
              cancelHandler={this.cancelSearch}
              hiddenButton
            />
          }
        </div>
        { isBusy && <NoData type='loading' /> }
        { !isBusy && <div className='content'>
            { !inSearch && <p className='title'>费用类型</p> }
            {
              inSearch
                ? <ul className='search-list'>
                    { list.map((v) =>
                      <li
                        key={v.id}
                        className={v.id === costTypeId ? 'active' : ''}
                        onClick={this.handleSelect(v.id, v.name)}
                      >
                        <span
                          dangerouslySetInnerHTML={
                            getHighLightText(v.name, keyword)
                          }
                        />
                      </li>)
                    }
                  </ul>
                : <ul className='all-list'>{this.buildList(list, 1)}</ul>
            }
          </div>
        }
      </div>
    )
  }
}

export default NewType
