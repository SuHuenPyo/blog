import React from 'react'
import './BannerTitle.scss';

//기본 배너 이미지 
import defaultImg from '../../assets/img/miary_img/Vertical.png'

export const BannerTitle = (props) => {
  return (
    <div className='BannerTitle'>
      <img src={props.banner || defaultImg} onError={(e)=>{e.target.src=defaultImg;}} alt=""/>
      <div className='BannertitleText'><h1>{props.title}</h1></div> 
    </div>
  )
}

export default BannerTitle