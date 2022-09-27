/**
 * @author Shun
 * @email vytngms@gmail.com
 * @create date 2022-09-17 15:47:13
 * @modify date 2022-09-27 01:56:55
 * @desc [댓글 컴포넌트를 관리하고 사용할 컴포넌트]
 */
import React, { useEffect, useState } from 'react'
import ContentComment from './ContentComment'
import ContentWrite, { CommentWrite } from './CommentWrite'

//img
import COMMENT_IMG from '../../assets/img/miary_img/comment.png'

//css
import "./CommentWrap.scss"
import axios from 'axios'
import {getComment, setRt} from '../../slices/CommentReadSlice'

//icon
import {
  FaUsers,
  FaReply,
  FaCut,
  FaUsersSlash
     
} from 'react-icons/fa';

import { useDispatch, useSelector } from 'react-redux';
import ContentCommentGroup from './ContentCommentGroup'
import CommentNumber from './CommentNumber'


export const CommentWrap = (props) => {

  const [BoardId, setBoardId] = useState(props.boardId);
  const [CurrentCommentPage, setCurrentCommentPage] = useState(1); // pagenation 기능을 위한 현재 페이지 번호 
  const [RealoadComment, setRealoadComment] = useState(false);  // 댓글 컴포넌트를 리로드하기 위한 state


  const {commentGet_rt,commentGet_rtmsg, commentGet_item , commentGet_m_item ,commentGet_loading} = useSelector((state)=> state.myCommentGet);
  const dispatch = useDispatch();
  

  

  useEffect(()=>{
    if(props.switch && BoardId){
      (async()=>{
        console.log("CommentWrap |dispatch 실행");
        await dispatch(getComment({
          boardId: props.boardId,
          page : CurrentCommentPage || 1,                                //여기서 페이징 번호 누르면 값바뀌게 
        }));

      })();   
    }
  },[BoardId, props.switch]);

  //reloadSwitch가 동작했을때 
  useEffect(()=>{
    if(RealoadComment){

        console.log("CommentWrap | reloadSwitch동작! | dispatch 실행");
        dispatch(getComment({
          boardId: props.boardId,
          page : CurrentCommentPage || 1,
        }));


      console.log(CurrentCommentPage);
      setRealoadComment(false);
    }
    
  },[RealoadComment, BoardId])

  /**
   * 페이지 리로드용
   * @param {*} isReload 
   */
  const reloadSwitch = (isReload) =>{
    setRealoadComment(true);
  }
  /**
   * 페이지 넘버를 변경하고 다시 리로드함
   * @param {number} numPage 
   * @returns no
   */
  const setPageNumber = numPage =>  {
    setCurrentCommentPage(numPage);
    reloadSwitch(true);
    
    console.log("CommentWarp setPageNumber 실행!");
    console.log("현재 페이지를 변경했습니다. 변경된 값 : " +  CurrentCommentPage);
  }
  
  
 
  return (
    
    <div className='CommentWrap'>

        <div className='CommentWrapImgBox'>
            <img src={COMMENT_IMG}/>
        </div>
        <hr/>
        
        <CommentWrite boardId={props.boardId} reloadSwitch={reloadSwitch}/> {/* (필수) 게시글에 대한 댓글 */}

        {/*만일 페이지 분량이 1 이상이라면 (ex 그룹  6개이상) 리턴값이 2이상이면 됨*/ }
        { 
          CurrentCommentPage &&  (commentGet_item.pageEnd >=2) && 
          
            <CommentNumber changePage={setPageNumber} CurrentPage={CurrentCommentPage || 1} pageEnd={commentGet_item.pageEnd} boardId={BoardId} />
            //<CommentNumber changePage={setPageNumber} CurrentPage={CurrentCommentPage || 16} pageEnd={16} boardId={BoardId}/>
          
        }

        {/* {
          ( ()=> {
            CurrentCommentPage && commentGet_item?.result.length ?
            ( 
              //댓글이 있다면
              commentGet_item.result.map((data,idx)=>{
                  return <><hr/><ContentCommentGroup data={data} reloadSwitch={reloadSwitch}/></>
              })
              
  
            ):(//아무댓글도 없다면
              <ContentComment/> 
            )            
          })()
        } */}

        
        {
          
          CurrentCommentPage && commentGet_item?.result?.length ? 
          ( 
            //댓글이 있다면
            commentGet_item.result.map((data,idx)=>{
                return <>
                  <div className='CommentHrCutContainer'>
                    <FaUsers className=' CommentHrCut'/>
                  </div>
                  <ContentCommentGroup data={data} reloadSwitch={reloadSwitch}/>
                </>
            })
            

          ):(//아무댓글도 없다면
            <ContentComment/> 
          )
        }


        

    </div>
    
  )
      
}

export default CommentWrap