/**
 * @author Shun
 * @email vytngms@gmail.com
 * @create date 2022-09-19 00:37:16
 * @modify date 2022-09-21 15:35:57
 * @desc [댓글 대댓글에 대한 로직 컴포넌트]
 */
import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { postCommentWrite, setRt } from '../../slices/CommentWriteSlice';
import './CommentWrite.scss';

//icon
import {
  FaUser,
     
} from 'react-icons/fa';

export const CommentWrite = (props) => {

  //필요한 정보 userId(세션으로 해결) , boardId, content, groupId

  const [ToUser, setToUser]   = useState(props.toMsg);    //누구에게 보내는지 User. 여기선 이름임(b_id (X))  (없을경우 게시글에 대한 댓글로 간주) 
  const [ToId, setToId]       = useState(props.toId);
  const [ToGroup, setToGroup] = useState(props.group);    // 해당댓글의 그룹 
  const [BoardId, setBoardId] = useState(props.boardId);  // 해당 댓글이 속한 글Id번호 
  const [Content, setContent] = useState(null);

  

  const {
    commentWrite_rt ,
    commentWrite_rtmsg, 
    commentWrite_item,  
    commentWrite_m_item,  
    commentWrite_loading
  } = useSelector((state) => state.myCommentWrite);

  const dispatch = useDispatch();

  //textArea 저장
  const handleSetTextArea  = (e)=>{
    setContent(e.target.value);
    console.log(JSON.stringify(Content));
  }

  //textArea에서 keydown이벤트감지후 Alt+enter와 enter를 후킹한다.
  const handleKeyDown  = (e) => {
    //window.alert(e.key);
    if(e.key === 'Enter' && e.shiftKey){
      setContent(e.target.value + '');
    }
    if(e.key === 'Enter' && !e.shiftKey) {
      doComment(e);
      return;
    }
    return;
  }

  const doComment = (e, doLike=false) => {
    // 댓글에 대한 content 내용 빈값 체크 5자 이상 글쓰기
    
    e.preventDefault();
    if(window.confirm("댓글을 정말 등록 하시겠습니까? ")){
      //여기에 댓글동록하는 로직 구현
      

      console.log(`ToUser = ${ToUser}   ToId = ${ToId}   ToGroup = ${ToGroup}`)
      if(!ToGroup && !ToUser){ // 게시글에 대한 댓글로직
        console.log("여기서 실행합니다.");
        (async()=>{
          await dispatch(postCommentWrite({boardId: props.boardId, content: Content}));
          //게시판 id, 내용 ,그룹id(그룹아이디가 없다면 신규그룹생성)
          props.reloadSwitch(true);
        })();
        
      }else if(ToUser && ToId){ //ToGroup은 0번부터 시작이라서 필터에 안넣음. 어차피 User, Id만 비교해도 충분함
        console.log("사실은 여기요");
        (async()=>{
          await dispatch(postCommentWrite({boardId: props.boardId, content: Content, groupId: ToGroup, toId: ToId}));
          props.reloadSwitch(true);
          props.removeComment();
        })();
      }
      

    }else{
      return;//취소
    }
  }
  useEffect(()=>{
    
    if(commentWrite_rt){
      
        let message = "";
        switch (commentWrite_rt){
          case 200:{
            message = "성공적으로 완료됨";
            dispatch(setRt(null));
            return;
            break;
          }
          case 401:{
            message = "댓글을 작성하려면 로그인을 해주세요.";
            break;
          }
          case 500:{
            message = "서버의 응답이 없거나 에러가 발생했습니다.";
            break;
          }
          default:{
            break;
          }
          //...
        }
        dispatch(setRt(null));
        window.alert(message);
        
        

    }
    
    
  }, [commentWrite_rt]);

  

  
  const SubmitBtn = (e)=>{
    
    e.preventDefault(e);
    doComment(e);

  }
  const SubmitWithLike = (e) =>{
    e.preventDefault(e);
    doComment(e, true);
    //좋아요 기능도 넣고 
    
  }

  //시나리오 ToUser를 props로 받으면  

  return (
    <div className='CommentWrite'>
            <form className='CommentWriteContainer'>
              <textarea className='CommentWriteTextBox' 
                value={Content}
                placeholder={`타인의 권리를 침해하거나 명예 훼손을 금지합니다. \r\nShift + Enter 로 줄 바꿈을 할 수 있습니다. \r\n댓글은 최대 100자입니다` }
                onChange={handleSetTextArea}
                onKeyPress={ handleKeyDown }
                
              />


              <div className='CommentWriteBtnBox'>
              
                <div className='CommentWriteToUser'><FaUser className='ProfileNameIcon'/><h1>{'To.'}{ToUser || `게시글`}</h1></div>
                  
                <input className='CommentWritesendBtn' type={'button'} onClick={SubmitBtn} value='전송'></input>
                <input className='CommentWritesendBtn' type={'button'} onClick={SubmitWithLike} value='전송 + 좋아요'></input>
                
              </div>

            </form>
    </div>
  )
}

export default CommentWrite;