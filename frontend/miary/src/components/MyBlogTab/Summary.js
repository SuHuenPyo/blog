/**
 * @author Shun
 * @email vytngms@gmail.com
 * @create date 2022-09-01 14:53:33
 * @modify date 2022-09-30 09:06:28
 * @desc [나의 블로그 관리탭 > Summary 를 위한 css]
 */
import React, { useEffect, useState } from 'react'
import './Summary.scss';


import replaceEmptyImg from '../../assets/img/miary_img/cats-7122943.png'
import Loading from './../Common_function/Loading'
import SearchView from '../Search/SearchView';

import {reset, getMyRecentPost} from './../../slices/RecentPostSlice'
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';


//최근글 7일 
export const Summary = (props) => {

  const {rt, rtmsg, item, loading} = useSelector((state)=> state.myRecentMyPost);
  const dispatch = useDispatch();

  const [isContent, setIsContent] = useState(true);

  useEffect(()=>{

    console.log("Summary입니다."+props.memberId);
    dispatch(getMyRecentPost({m_id:props.memberId}));

  }, [props.memberId])

  useEffect(()=>{
    if(item){
      if(Object.keys(item).length === 0 && item.constructor === Object){ // 결과값이 비었다면 컨텐츠가 없음 
        console.log('비었어요')  
        setIsContent(false);
      }
    }

  },[item])

  

  return (
    <div className='Summary'>
      {
        isContent && item && rt &&
        '최근 일주일 간의 포스트가 표시됩니다.'
      }
      <div className='SummaryContainer'>
        
        { loading && <Loading/> }


        {
          isContent && item && rt &&

          item.result?.map((item, index) => {
            return <Link to={`/contentDetail/${item.boardId}`} key={index}>
                        <SearchView 
                            boardId={item.boardId} title={item.boardTitle} banner={item.boardBanner} content={item.boardMarkdown}
                            memberId={item.boardMemberId} boardMDate={item.boardMDate} hits={item.boardHits} 
                            like={item.boardLike} memberName={item.memberUserId} memberPic={item.memberPic} memberUserName={item.memberName}
                        />
            </Link>
          })
        }

        { 
          (rt == 204) && 
              <div className='SummaryEmptyContentReplaceImg'>
                <img src={replaceEmptyImg}/>
                생성된 최근 포스트가 없습니다. 최근 일주일 간의 포스트가 표시됩니다.
              </div>
        }
          
      </div>
      

    </div>
  )
}

export default Summary;