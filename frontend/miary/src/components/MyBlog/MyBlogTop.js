import React from 'react'
import './MyBlogTop.scss';

export const MyBlogTop = () => {
  const userId = "vytngms"
  const userName = "suhuen Pyo"
  return (
    <div className='MyBlogTop'>
        <div className='MyBlogProfileBox'>
          <img src={require('../../assets/img/miary_img/temp_profile.png')}></img>
        </div>
        <div className='MyBlogNameBox'>
          <h2>{userName}</h2>
        </div>
        <div className='MyBlogIdBox'>
          <h2>{'@'+userId}</h2>
        </div>
        <div className='MyBlogEditbtnBox'>
        <button>프로필 편집</button>
        </div>
        
        
    </div>
  )
}

export default MyBlogTop;

