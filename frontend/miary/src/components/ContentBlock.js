/**
 * @author [Shun]
 * @email [vytngms@mail.com]
 * @create date 2022-06-03 15:16:51
 * @modify date 2022-06-03 16:15:35
 * @desc [컨텐츠 뷰를 위한 개별 블록 컴포넌트]
 */
import React from 'react'
import '../assets/css/ContentBlock.scss';


export const ContentBlock = (props) => {
  return (
    <div className='ContentBlockContainer'>
        <div className='ContentBlockImage'> <img src={require('./../assets/img/miary_img/WhiteScale.png')}></img> </div>
        <div className='ContentArticlContainer'>
            <div className='ContentBlockArticleTitle'>제목</div>
            <div className='ContentBlockArticleContent'>내용내용내용내용내용내용내용내용내용내용내용내용내용내용내용내용내용내용내용내용내용내용내용내용내용내용내용내용내용내용내용내용내용내용내용내용내용내용내용내용내용</div>
            <div className='ContentBlockArticleAuthor'>글쓴이 Mairy</div>
        </div>
        
    </div>
        

  )
}

export default ContentBlock;
