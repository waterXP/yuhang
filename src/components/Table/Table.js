import React, { Component } from 'react'
import PropTypes from 'prop-types'
import './Table.scss'

class Table extends Component {
  render () {
    const { columns, data } = this.props
    const dKey = columns[0].key
    return <table className='yh-table'>
      <thead>
        <tr>
          {
            columns.map(v => 
              <th key={v.key}>{ v.name }</th>
            )
          }
        </tr>
      </thead>
      <tbody>
        {
          data.map((v, i) =>
            <tr key={dKey ? v[dKey] : i}>
              {
                columns.map(k =>
                  <td key={k.key}>
                    { k.render ? k.render(v) : v[k.key] }
                  </td>
                )
              }
            </tr>
          )
        }
      </tbody>
    </table>
  }
}

Table.propTypes = {
  columns: PropTypes.array,
  data: PropTypes.array
}

export default Table
