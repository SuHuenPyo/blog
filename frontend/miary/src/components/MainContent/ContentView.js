/**
 * @author Shun
 * @email vytngms@gmail.com
 * @create date 2022-06-03 15:23:37
 * @modify date 2022-09-29 04:57:44
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
import Loading from '../Common_function/Loading';
import ContentNumber from './ContentNumber';

export const ContentView = (props) => {

  const {rt, rtmsg, item, loading} = useSelector((state)=> state.myContent);
  
  const dispatch = useDispatch();

  const [targetPage, setTargetPage] = useState();
  const [SwitchReload, setSwitchReload] = useState(false);

  useEffect(()=>{
    if(!loading){
      dispatch(getContent({}));
    }
    console.log("contentView Use Effect 실행");
  }, [])

  useEffect(()=>{

    if(SwitchReload){

      if(!loading){
        dispatch(getContent({page:targetPage}));
      }


      setSwitchReload(false);
    }

  }, [SwitchReload])

    
 

  return (
    <div className='ContentViewContainer'>
      
       { 
       !loading && item ?
       
        item.result?.map((idx, index) => (
          
          <Link to={`/contentDetail/${idx.boardId}`} key={index}>
            <ContentBlock boardId={idx.boardId} title={idx.boardTitle} banner={idx.boardBanner} content={idx.boardMarkdown}
            memberId={idx.boardMemberId} boardMDate={idx.boardMDate} hits={idx.boardHits} 
            like={idx.boardLike} memberName={idx.memberUserId} memberPic={idx.memberPic} memberUserName={idx.memberName}/>
          </Link>
        
        ))
       
       
         : <Loading/>


      }
      {
        !loading && (item.pageEnd > 1) &&
          <ContentNumber changePage={setTargetPage} changeSwitch={setSwitchReload} pageEnd={item.pageEnd} currentPage={targetPage || 1}/>
          
          
      }
      

    </div>
  )
}

export default ContentView;