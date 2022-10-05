import React, { useEffect, useState } from 'react'
import './MyBlogTop.scss';
import defaultProfileImg from '../../assets/img/miary_img/profile_default_03.png'
import { Link } from 'react-router-dom';



//Name 유저이름 Image 프로필사진 userId 유저아이디 memberId 고유아이디
export const MyBlogTop = (props) => {


  return (
    
    <div className='MyBlogTop'>
        <div className='MyBlogProfileBox'>

            <img src={props?.Image || defaultProfileImg}></img>
          
        </div>
        <div className='MyBlogNameBox'>
          <h2>{props?.Name || "유저이름 불러오는중.."}</h2>
        </div>
        <div className='MyBlogIdBox'>
          <h2>{'@'+ (props?.userId || "유저아이디 불러오는중..")}</h2>
        </div>
        <div className='MyBlogEditbtnBox'>
          <Link to='/management'> <button>프로필 편집</button></Link>
        </div>
        
    </div>
  )
}

export default MyBlogTop;

