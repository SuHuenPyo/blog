import React from 'react'
import './Footer.scss';

export const Footer = () => {
  return (
    <div className='FooterContainer'>
      <ul>
        <li><a href="https://github.com/SuHuenPyo/blog/blob/main/README.md">서비스 소개</a></li>
        <li><a href="https://github.com/SuHuenPyo/blog">오픈소스</a></li>
        <li><a href="mailto:vytngms@gmail.com">연락처</a></li>
      </ul>
    </div>
  )
}

export default Footer;