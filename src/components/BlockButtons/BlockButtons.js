import React from 'react'
import PropTypes from 'prop-types'

import './BlockButtons.scss'

export const BlockButtons = ({ btns = [], btnSplit }) => {
  let len = btnSplit || btns.filter((v) => !v.hide).length
  return (
    <div className='wm-block-buttons'>
      { btns.map((v, i) => (
        !v.hide && <button
          style={{ width: `${~~(100 / len)}%` }}
          key={i}
          type={v.type || 'button'}
          disabled={v.disabled}
          onClick={v.clickHandle}>
          {v.text}
        </button>
      ))}
    </div>
  )
}

BlockButtons.propTypes = {
  btns: PropTypes.array,
  btnSplit: PropTypes.number
}

export default BlockButtons
