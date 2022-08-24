/**
 * @author Shun
 * @email vytngms@gmail.com
 * @create date 2022-06-16 17:00:07
 * @modify date 2022-08-24 17:42:23
 * @desc [글 발행을 위한 페이지]
 */
import React from 'react'
import { Footer } from '../components/Footer/Footer';
import Header from '../components/Header/Header';
import WriteBox from '../components/WriteBox/WriteBox';

export const WritePost = () => {
  return (
      <div className='WritePost'>
        <WriteBox/>
      </div>
      
  )
}
export default WritePost;

