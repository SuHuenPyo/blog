/**
 * @author Shun
 * @email vytngms@gmail.com
 * @create date 2022-06-15 15:48:22
 * @modify date 2022-06-21 13:57:16
 * @desc [내 블로그 페이지]
 */
import React from 'react'
import Header from '../components/Header/Header';
import MyBlogTop from '../components/MyblogContent/MyBlogTop';
import {Footer} from '../components/Footer/Footer';
import MyBlogContent from '../components/MyblogContent/MyBlogContent';

export const MyBlog = () => {
  return (
    <div>
        <Header/>
        <MyBlogTop/>
        <MyBlogContent/>
        <Footer/>
    </div>
  )
  
}

export default MyBlog;
