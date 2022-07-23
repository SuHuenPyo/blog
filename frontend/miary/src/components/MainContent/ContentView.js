/**
 * @author Shun
 * @email vytngms@gmail.com
 * @create date 2022-06-03 15:23:37
 * @modify date 2022-07-23 09:39:01
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
      { content ?
        content.map(idx => (
          <ContentBlock id={idx.id} title={idx.title} banner={idx.banner} content={idx.content} author={idx.author} hits={idx.hits} like={idx.like}/>
          
        )) : "데이터를 불러오는데 실패했습니다."


      }
      {console.log("다시:" + content)}
      

    </div>
  )
}

export default ContentView;