/**
 * @author Shun
 * @email vytngms@gmail.com
 * @create date 2022-08-30 03:22:48
 * @modify date 2022-09-27 01:49:04
 * @desc [글 상세보기 란에서 사용하는 댓글 컴포넌트]
 * 
 *<a href="https://www.flaticon.com/kr/free-icons/" title="귀엽다 아이콘">귀엽다 아이콘  제작자: Swifticons - Flaticon</a> 
 * 
 */
import React, { useState } from 'react'
import './ContentComment.scss';

import defaultProfileImg from '../../assets/img/miary_img/profile_default_03.png';

//icon
import {
  FaUser,
  FaReply,
  FaCrown,
     
} from 'react-icons/fa';
import { useDispatch, useSelector } from 'react-redux';
import CommentWrite from './CommentWrite';

const KR_TIME_DIFF = 9 * 60 * 60 * 1000;

  /**
   * 아무도 댓글을 작성안한 컴포넌트에서 default로 보여줄 시간을 만드는 함수
   * @returns  {string} 가공된 한국 시간이 반환됩니다. 년 월 일 요일
   */
   const calcTime = ()=>{
    const now = new Date(); // 현재 시간
    const utcNow = now.getTime() + (now.getTimezoneOffset() * 60 * 1000); // 현재 시간을 utc로 변환한 밀리세컨드값
    const koreaTimeDiff = 9 * 60 * 60 * 1000; // 한국 시간은 UTC보다 9시간 빠름(9시간의 밀리세컨드 표현)
    const koreaNow = new Date(utcNow + koreaTimeDiff); // utc로 변환된 값을 한국 시간으로 변환시키기 위해 9시간(밀리세컨드)를 더함

    let result = "";
    let day = ["일","월", "화", "수", "목", "금", "토"];

    result += "오늘은 "
    result += koreaNow.getFullYear().toString()+"년";
    result += "-"+(koreaNow.getMonth()+1).toString()+"월";
    result += "-"+koreaNow.getDate().toString()+"일";
    result += "-"+day[koreaNow.getDay()]+"요일"
    
    return result;
  }

  
export const ContentComment = (props) => {

  const [ReplyComment, setReplyComment] = useState(null);
  const createReplyCommentUI = ()=>{
    setReplyComment(!ReplyComment);
  }
  return (
    <>
      <div className='ContentCommentContainer'>
      {/*console.log(props.ProfileMemberId ,props?.ProfileOwnerId )*/}
        <div className='ContentCommonBox' >
          {
            ((props?.ProfileMemberId == props?.ProfileOwnerId) && props?.ProfileOwnerId ) ? 
            (
              <div className='ContentOwnerCommentArea'>
                <div className='CommentOwnerProfileContentBox'>
                    <div className='CommentOwnerProfileName'>
                      {!props || <div className='CommentOwnerReplayBtn' onClick={createReplyCommentUI}><FaReply className='replayIcon'/></div>}
                      <div className='CommentOwnerProfileNameIconBox'><FaCrown className='ProfileOwnerNameIcon'/><h1>{props.ProfileName +""|| `마이어리`}</h1></div>
                      
                    </div>
                    <div className='CommentOwnerProfileContent'><h1>{props.ProfileContent}</h1></div>
                    <div className='CommentOwnerProfileTime'><h1>{props.ProfileTime}</h1></div>
                </div>
                <div className='CommentOwnerProfileBox'>
                    <img src={props.ProfileImg || defaultProfileImg}/>
                </div>
              </div>
            )
            :
            (
              <div className='ContentCommentArea'>
              
                <div className='CommentProfileBox'>
                    <img src={props.ProfileImg || defaultProfileImg}/>
                </div>
                <div className='CommentProfileContentBox'>
                    <div className='CommentProfileName'>
                      <div className='CommentProfileNameIconBox'><FaUser className='ProfileNameIcon'/><h1>{props.ProfileName || `마이어리`}</h1></div>
                      {!props || <div className='CommentReplayBtn' onClick={createReplyCommentUI}><FaReply className='replayIcon'/></div>}
                    </div>
                    <div className='CommentProfileContent'><h1>{props.ProfileContent || `아직 아무도 댓글을 작성하지 않았어요. \n첫번째 댓글을 달아주세요`}</h1></div>
                    <div className='CommentProfileTime'><h1>{props.ProfileTime || `${calcTime()}`}</h1></div>
                </div>
              </div>
            )
          }
        
         
        </div>
        
        { ReplyComment && 
          <CommentWrite 
            toMsg={props.ProfileName}
            toId={props.ProfileMemberId}
            group={props.ProfileGroup}
            boardId={props.ProfileBoardId}
            reloadSwitch={props.reloadSwitch}
            removeComment={createReplyCommentUI}
          />
        }
        

      


      </div>
    </>
  )
}

export default ContentComment
