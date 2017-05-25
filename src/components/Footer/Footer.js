import React from 'react'
import FooterButton from './FooterButton'
import './Footer.scss'

export const Footer = () => (
  <footer className='footer'>
    <FooterButton
      linkUrl='/'
      title='Home'
      imgUrl='https://ss0.bdstatic.com/5aV1bjqh_Q23odCf/static/superman/img/logo/bd_logo1_31bdc765.png'
      homePage />
    <FooterButton linkUrl='/counter' title='Counter' />
    <FooterButton linkUrl='/counter' title='Counter' />
    <FooterButton linkUrl='/counter' title='Counter' />
    <FooterButton linkUrl='/counter' title='Counter' />
  </footer>
)

export default Footer
