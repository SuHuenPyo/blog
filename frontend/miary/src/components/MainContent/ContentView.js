/**
 * @author Shun
 * @email vytngms@gmail.com
 * @create date 2022-06-03 15:23:37
 * @modify date 2022-09-05 07:55:39
 * @desc [content영역에 불러올 컴포넌트 메인 글들을 불러온다.]
 */
import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom';
import { MiaryGetAxios } from '../Common_function/MiaryAxios';
import ContentBlock from './ContentBlock';
import './ContentView.scss';

//redux;
import {useSelector, useDispatch} from "react-redux";
import { getContent } from '../../slices/ContentSlice';

export const ContentView = (props) => {

  const {rt, rtmsg, item, loading} = useSelector((state)=> state.myContent);
  const dispatch = useDispatch();

  useEffect(()=>{
    if(!loading){
      dispatch(getContent({}));
    }
    console.log("contentView Use Effect 실행");
  }, [])

    
 

  return (
    <div className='ContentViewContainer'>
      { !loading && item ?
        item.map((idx, index) => (
          
          <Link to={`/contentDetail/${idx.boardId}`} key={index}>
            <ContentBlock boardId={idx.boardId} title={idx.boardTitle} banner={idx.boardBanner} content={idx.boardMarkdown}
            memberId={idx.boardMemberId} boardMDate={idx.boardMDate} hits={idx.boardHits} 
            like={idx.boardLike} memberName={idx.memberUserId} memberPic={idx.memberPic}/>
          </Link>
         
        )) : "데이터를 불러오는데 실패했습니다."


      }
    </div>
  )
}

export default ContentView;