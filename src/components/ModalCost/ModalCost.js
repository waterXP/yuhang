import React, { Component } from 'react'
import PropTypes from 'prop-types'
import './ModalCost.scss'

class ModalCost extends Component {
  constructor (props) {
    super(props)
    const { costType, paths } = this.props
    this.state = {
      inSearch: false,
      paths: [...paths]
    }
  }

  toggleSearch () {
    this.setState((prevState, props) => ({ inSearch: !prevState.inSearch }))
  }
  getChildren (id) {
    this.setState(({ paths }, props) => {
      return { paths: [...paths, id] }
    })
  }
  getList (toParent) {
    this.setState(({ paths }, { costType }) => {
      if (paths && paths.length > 0) {
        paths.pop()
      }
      return { paths }
    })
  }
  getAllResult (list, origin, paths, keyword) {
    origin.forEach((v) => {
      if (v.childs) {
        this.getAllResult(list, v.childs, [...paths, v.id], keyword)
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
  
  render () {
    const { costType, select, selType } = this.props
    const { inSearch, paths } = this.state

    let list = []
    if (inSearch) {
      this.getAllResult(list, costType, [], this.keyword.value)
    } else {
      list = costType
      if (paths.length > 0) {
        paths.forEach((parentId) => {
          list = (list.find((v) => v.id === parentId)).childs
        })
      }      
    }

    return (
      <div className='wm-modal-cost'>
        <div className='search'>
          <i className='fa fa-search' /><input type='text' ref={ (e) => { this.keyword = e } } /><button onClick={ this.toggleSearch.bind(this) }>{ inSearch ? '取消' : '搜索' }</button>
        </div>
        <ul>
          { paths.length > 0 && !inSearch && <li onClick={ this.getList.bind(this, true) } className='return'>返回上级<i className='fa fa-reply' /></li> }
          { list.length > 0 && list.map((v) => {
            if (inSearch) {
              return (
                <li
                  key={ `s-${v.id}` }
                  onClick={ select.bind(this, v.id, v.name, v.paths) }
                  className={ `${selType === v.id ? 'active' : ''}` }
                >
                  { v.name }
                </li>
              )
            } else {
              return (
                <li
                  key={ v.id }
                  onClick={ v.childs ?
                    this.getChildren.bind(this, v.id) :
                    select.bind(this, v.id, v.name, paths)
                  }
                  className={ `${selType === v.id || this.props.paths[paths.length] === v.id ? 'active' : ''}` }
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

export default ModalCost
