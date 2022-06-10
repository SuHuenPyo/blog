/**
 * @author Shun
 * @email vytngms@gmail.com
 * @create date 2022-06-03 15:23:37
 * @modify date 2022-06-09 19:55:07
 * @desc [content영역에 불러올 컴포넌트 메인 글들을 불러온다.]
 */
import React from 'react'
import ContentBlock from './ContentBlock';
import './ContentView.scss';

export const ContentView = (props) => {
  return (
    <div className='ContentViewContainer'>
        
        <ContentBlock/>
        <ContentBlock/>
        <ContentBlock/>
        <ContentBlock/>
        <ContentBlock/>
        <ContentBlock/>
        <ContentBlock/>
        <ContentBlock/>
        <ContentBlock/>
        <ContentBlock/>
        <ContentBlock/>
        <ContentBlock/>
        
        

    </div>
  )
}

export default ContentView;