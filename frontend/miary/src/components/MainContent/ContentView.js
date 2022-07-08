/**
 * @author Shun
 * @email vytngms@gmail.com
 * @create date 2022-06-03 15:23:37
 * @modify date 2022-07-08 16:46:17
 * @desc [content영역에 불러올 컴포넌트 메인 글들을 불러온다.]
 */
import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { MiaryGetAxios } from '../Common_function/MiaryAxios';
import ContentBlock from './ContentBlock';
import './ContentView.scss';

export const ContentView = (props) => {

  const [content, setContent] = useState([]);


  useEffect(()=>{
    let response = null;
    (async ()=>{
      response = await MiaryGetAxios("http://localhost:8080/post", "글가져오기 성공" , "글 가져오기 실패");
      console.log(response);
      setContent(response);
    })();
    
  }, []);

  return (
    <div className='ContentViewContainer'>
      {
        content.map(idx => (
          <ContentBlock id={idx.id} title={idx.title} banner={idx.banner} content={idx.content} author={idx.author} hits={idx.hits} like={idx.like}/>
          
        ))

        

      }
      {console.log("다시:" + content)}
      

    </div>
  )
}

export default ContentView;