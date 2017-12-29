import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import './Sidebar.scss'

import { goLocation } from '@/lib/base'
import { sidebar } from '@/lib/enums'

class Sidebar extends Component {
  static propTypes = {
    pathname: PropTypes.string
  }

  constructor () {
    super(...arguments)
    this.state = { shrink: {} }
    this.toggleMenu = this::this.toggleMenu
  }

  toggleMenu (key) {
    this.setState(({ shrink }) => {
      const v = !shrink[key]
      return {
        shrink: Object.assign({}, shrink, { [key]: v })
      }
    })
  }

  render () {
    const { pathname } = this.props
    const { shrink } = this.state
    return <div className='yh-sidebar'>
      <ul>
        {
          sidebar.map(v => {
            const active = pathname.indexOf(v.path) === 0
            return <ul
              key={v.key}
              className='menu-group'
            >
              { v.name &&
                <li
                  className={
                    `menu-parent${active
                      ? ' active'
                      : ''}`
                  }
                  onClick={() => this.toggleMenu(v.key)}
                >
                  <i className={`fas fa-${v.icon}`} />&nbsp;{ v.name }
                </li>
              }
              {
                v.children && !shrink[v.key] && v.children.map(c => {
                  const active = pathname.indexOf(c.path) === 0
                  return <li
                    key={c.key}
                    className={
                      `menu-child${active
                        ? ' active'
                        : ''}`
                    }
                    onClick={!active && (() => goLocation(c.path))}
                  >
                    <i className={`fas fa-${c.icon}`} />&nbsp;{ c.name }
                  </li>
                })
              }
            </ul>
          })
        }
      </ul>
    </div>
  }
}

const mapStateToProps = state => ({
  pathname: state.location.pathname
})
const mapDispatchToProps = {

}

export default connect(mapStateToProps, mapDispatchToProps)(Sidebar)
