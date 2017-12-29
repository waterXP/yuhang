import React from 'react'
import PropTypes from 'prop-types'
import './MainMenu.scss'

import { mainMenuLinks } from '@/lib/enums'

const MainMenu = () =>
  <ul className='yh-main-menu'>
    {
      mainMenuLinks.map((v, i) =>
        <li key={i}>
          <a
            className='a-menu'
            href={v.link}
            target='_blank'
          >{ v.text }</a>
        </li>
      )
    }
  </ul>

export default MainMenu
