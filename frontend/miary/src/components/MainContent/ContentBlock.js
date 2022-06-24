/**
 * @author [Shun]
 * @email [vytngms@mail.com]
 * @create date 2022-06-03 15:16:51
 * @modify date 2022-06-24 17:07:36
 * @desc [컨텐츠 뷰를 위한 개별 블록 컴포넌트]
 */
import React, { useState} from 'react'
import './ContentBlock.scss';


export const ContentBlock = (props) => {
  
  //Hook
  const [articleContent, setTitle] = useState(props.articleContent);

  // const clickHandler = () => {
  //   setTitle('내용내용내용내용내용내용내용내용내용내용내용내용내용내용내용내용내용내용내용내용내용내용내용내용내용내용내용내용내용내용내용내용내용내용내용내용내용내용내용내용내용내용내용내용내용내용내용내용내용내용내용내용내용내용내용내용');
  // }

  return (
    <div className='ContentBlockContainer'>
        <div className='ContentBlockImage'> <img src={require('../../assets/img/miary_img/WhiteScale.png')} alt=""></img> </div>
        <div className='ContentArticlContainer'>
            <div className='ContentBlockArticleTitle'>제목</div>
            <div className='ContentBlockArticleContent'>{articleContent}</div>
            <div className='ContentBlockArticleAuthorContainer'>글쓴이 Mairy 
              
            </div>
                
        </div>
        
        
    </div>
        

  )
}

export default ContentBlock;
