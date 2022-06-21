import React from 'react'
import './Footer.scss';

export const Footer = () => {
  return (
    <div className='FooterContainer'>
      <ul>
        <li><a href="#">서비스 소개</a></li>
        <li><a href="#">오픈소스</a></li>
        <li><a href="#">연락처</a></li>
        <li><a href="#">로드맵</a></li>
      </ul>
    </div>
  )
}