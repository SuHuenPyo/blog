/**
 * @author [Shun]
 * @email [vytngms@mail.com]
 * @create date 2022-06-03 15:16:51
 * @modify date 2022-09-20 08:13:08
 * @desc [컨텐츠 뷰를 위한 개별 블록 컴포넌트]
 */
import React, { useEffect, useRef, useState} from 'react'
import './ContentBlock.scss';
import defaultContentImg from '../../assets/img/miary_img/WhiteScale.png';
import defaultProfileImg from '../../assets/img/miary_img/profile_default_03.png';



export const ContentBlock = (props) => {
  

  const refTitle = useRef();

  //title에 들어갈 글자 사이즈를 자동으로 조절해줌
  // useEffect(()=>{
  //   let [targetWidth, targetCount] = [refTitle.current.offsetWidth, refTitle.current.innerHTML.length];
  //   let weightValue = 1.2;
  //   let fontSize = targetWidth / targetCount;
    
  //   fontSize *= weightValue;

  //   console.log(fontSize);
  //   refTitle.current.style=`font-size: ${fontSize}px`;

  // },[]);

  return (
    <div className='ContentBlockContainer'>
        {/* <div className='ContentBlockImage'> <img src={require('../../assets/img/miary_img/WhiteScale.png')} alt=""></img> </div> */}
        <div className='ContentBlockImage'> 
          <img src={props.banner || defaultContentImg} onError={(e)=>{e.target.src = defaultContentImg;}} alt=""></img>
        </div>
  
        <div className='ContentArticlContainer'>
            <div className='ContentBlockArticleTitleBox'>
              <div className='ContentBlockArticleTitle' ref={refTitle}>{` ${props.title}`}</div>
              
            </div>
            <div className='ContentBlockArticleContentBox'>
              <div className='ContentBlockArticleContent'>
                {props.content}
              </div>
            </div>
            <div className='ContentBlockArticleAuthorContainer'>
              <div className='ContentBlockArticleAuthorPic'>
                <div className='ContentBlockArticleAuthorPicBox'>
                  <img src={props.memberPic || defaultProfileImg} ></img>
                </div> 
                
              </div>
              <div className='ContentBlockArticleAuthorInfo'>
                <div className='ContentBlockArticleAuthorName'>
                  <h1>{props.memberUserName + ' 님의 작성글' || "무명의 저자 님이 작성함"}</h1>
                </div>
                <div className='ContentBlockArticleAuthorDateHit'>
                  <div className='ContentBlockArticleAuthorDate'>{props.boardMDate}</div>
                  <div className='ContentBlockArticleAuthorLike'>Like<h1>{props.like}</h1> </div>
                  <div className='ContentBlockArticleAuthorHit'>Read<h1>{props.hits}</h1></div>
                  
                </div>

              </div>

            </div>
                
        </div>
        
        
    </div>
                    //   {
                    //     + props.boardMDate + (props.boardHits || ' 0 ') + (props.boardLike|| ' 0 ') 
                    //  }
        // boardId title banner content memberId boardMDate hits like memberName memberPic
  )
}

export default ContentBlock;
