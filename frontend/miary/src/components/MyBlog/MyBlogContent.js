import React from 'react'
import './MyBlogContent.scss';
import MyBlogTabView from './MyBlogTabView';
import MyBlogTop from './MyBlogTop';

export const MyBlogContent = () => {
  return (
    <div className='MyBlogContent'>

      <MyBlogTop/>
      <MyBlogTabView/>
      

    </div>
  )
}

export default MyBlogContent;