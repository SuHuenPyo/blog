/**
 * @author Shun
 * @email vytngms@gmail.com
 * @create date 2022-06-16 17:00:07
 * @modify date 2022-06-16 18:04:36
 * @desc [글 발행을 위한 페이지]
 */
import React from 'react'
import { Footer } from '../components/Footer/Footer';
import Header from '../components/Header/Header';
import WriteBox from '../components/WriteBox/WriteBox';

export const WritePost = () => {
    const headerTools = [
        {tools1: '글 쓰기', tools2: '프로필'}
    ]
  return (
      <div className='WritePost'>
        <Header tools1={headerTools[0].tools1} tools2={headerTools[0].tools2}/>
        <WriteBox/>
        <Footer/>
      </div>
      
  )
}
export default WritePost;

