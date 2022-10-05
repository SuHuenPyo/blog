import React, { useEffect, useState } from 'react'
import './MyBlogPost.scss';

import replaceEmptyImg from '../../assets/img/miary_img/birds-979262_1920.jpg'



import {reset, getMyContent} from './../../slices/PostMyContentSlice'
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import SearchView from '../Search/SearchView';
import Loading from '../Common_function/Loading';

//나의 전체글 
const MyBlogPost = (props) => {

  const {rt, rtmsg, item, loading} = useSelector((state)=> state.myPostMyContent);
  const dispatch = useDispatch();
  const [isContent, setIsContent] = useState(true);
  useEffect(()=>{
    
    console.log("MyBlogPost입니다."+props.memberId);
    dispatch(getMyContent({m_id: props.memberId}));

  }, [props.memberId]);

  useEffect(()=>{
  
    if(item){
      if(Object.keys(item).length === 0 && item.constructor === Object){ // 결과값이 비었다면 컨텐츠가 없음 
        console.log('비었어요')  
        setIsContent(false);
      }
    }

  },[item])

  return (
    <div className='MyBlogPost'>
        <div className='MyBlogPostContainer'>

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
          { (rt == 204) && 
            <div className='MyBlogPostEmptyContentReplaceImg'>
                <img src={replaceEmptyImg}/>
                블로그가 비었습니다.
            </div>
          }


        </div>
    </div>
  )
}

export default MyBlogPost