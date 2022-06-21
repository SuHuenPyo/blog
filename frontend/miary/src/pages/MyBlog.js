/**
 * @author Shun
 * @email vytngms@gmail.com
 * @create date 2022-06-15 15:48:22
 * @modify date 2022-06-21 16:20:28
 * @desc [내 블로그 페이지]
 */
import React from 'react'
import Header from '../components/Header/Header';
import Footer from '../components/Footer/Footer';
import MyBlogContent from '../components/MyBlog/MyBlogContent';

export const MyBlog = () => {
  return (
    <div>
        <Header/>
        <MyBlogContent/>
        <Footer/>
    </div>
  )
  
}

export default MyBlog;
