/**
 * @author Shun
 * @email vytngms@gmail.com
 * @create date 2022-08-30 03:22:48
 * @modify date 2022-09-01 12:50:24
 * @desc [글 상세보기 란에서 사용하는 댓글 컴포넌트]
 * 
 *<a href="https://www.flaticon.com/kr/free-icons/" title="귀엽다 아이콘">귀엽다 아이콘  제작자: Swifticons - Flaticon</a> 
 * 
 */
import React from 'react'
import './ContentComment.scss';

import defaultProfileImg from '../../assets/img/miary_img/profile_default_03.png';


//icon
import {
  FaUser,
     
} from 'react-icons/fa';



export const ContentComment = () => {
  return (
    <>
      <div className='ContentCommentContainer'>

        <div className='ContentCommentBox ContentCommonBox' >
          <div className='ContentCommentArea'>
            
              <div className='CommentProfileBox'>
                  <img src={defaultProfileImg}/>
              </div>
              <div className='CommentProfileContentBox'>
                  
                  <div className='CommentProfileName'>
                    <div className='CommentProfileNameIconBox'><FaUser className='ProfileNameIcon'/><h1>{null || `로딩중인 유저..`}</h1></div>
                  </div>
                  <div className='CommentProfileContent'><h1>{null || `불러오는 중이에요! 잠시만 기다려봐요!`}</h1></div>
                  <div className='CommentProfileTime'><h1>{null || `시간 불러오는중...`}</h1></div>

                </div>

          </div>
        </div>
        
        <hr/>
        {/* <div className='ContentCommentToCommentBox ContentCommonBox' >
          <div className='ContentCommentArea'>
            여기는 답글의 답글
          </div>
        </div> */}


      </div>
    </>
  )
}

export default ContentComment
