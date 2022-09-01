import React from 'react'
import './MyBlogPost.scss';

import replaceEmptyImg from '../../assets/img/miary_img/birds-979262_1920.jpg'

const MyBlogPost = () => {
  return (
    <div className='MyBlogPost'>
        <div className='MyBlogPostContainer'>
            {null || 
                <div className='MyBlogPostEmptyContentReplaceImg'>
                    <img src={replaceEmptyImg}/>
                    블로그가 비었습니다.
                </div>
            }
        </div>
    </div>
  )
}

export default MyBlogPost