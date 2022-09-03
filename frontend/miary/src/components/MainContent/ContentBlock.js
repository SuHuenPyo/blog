/**
 * @author [Shun]
 * @email [vytngms@mail.com]
 * @create date 2022-06-03 15:16:51
 * @modify date 2022-09-03 08:05:12
 * @desc [컨텐츠 뷰를 위한 개별 블록 컴포넌트]
 */
import React, { useState} from 'react'
import './ContentBlock.scss';
import defaultContentImg from '../../assets/img/miary_img/WhiteScale.png';


export const ContentBlock = (props) => {
  

  return (
    <div className='ContentBlockContainer'>
        {/* <div className='ContentBlockImage'> <img src={require('../../assets/img/miary_img/WhiteScale.png')} alt=""></img> </div> */}
        <div className='ContentBlockImage'> 
          <img src={props.banner || defaultContentImg} onError={(e)=>{e.target.src = defaultContentImg;}} alt=""></img>
        </div>
  
        <div className='ContentArticlContainer'>
            <div className='ContentBlockArticleTitle'>{props.title}</div>
            <div className='ContentBlockArticleContent'>{props.content}</div>
            <div className='ContentBlockArticleAuthorContainer'>{
                props.memberName + props.boardMDate + (props.boardHits || ' 0 ') + (props.boardLike|| ' 0 ') 
              }
            </div>
                
        </div>
        
        
    </div>
        

  )
}

export default ContentBlock;
