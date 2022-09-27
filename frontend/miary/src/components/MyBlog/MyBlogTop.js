import React from 'react'
import './MyBlogTop.scss';
import defaultProfileImg from '../../assets/img/miary_img/profile_default_03.png'
import { Link } from 'react-router-dom';

export const MyBlogTop = () => {
  const userId = null || "유저 아이디 불러오는중..";
  const userName = null || "유저 이름 불러오는중..";
  return (
    <div className='MyBlogTop'>
        <div className='MyBlogProfileBox'>
          <img src={defaultProfileImg}></img>
        </div>
        <div className='MyBlogNameBox'>
          <h2>{userName}</h2>
        </div>
        <div className='MyBlogIdBox'>
          <h2>{'@'+userId}</h2>
        </div>
        <div className='MyBlogEditbtnBox'>
       <Link to='/management'> <button>프로필 편집</button></Link>
        </div>
        
    </div>
  )
}

export default MyBlogTop;

