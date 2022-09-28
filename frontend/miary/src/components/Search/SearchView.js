import React, { useEffect, useState } from 'react'
import './SearchView.scss';
import defaultContentImg from '../../assets/img/miary_img/WhiteScale.png';
import defaultProfileImg from '../../assets/img/miary_img/profile_default_03.png';

const SearchView = (props) => {


    const [Keyword, setKeyword] = useState(props.Keyword)


    useEffect(()=>{
        
    }, [Keyword])

    

  return (
        <div className='SearchView'>

          <div className='SearchBlockImage'> 
            <img src={props.banner || defaultContentImg} onError={(e)=>{e.target.src = defaultContentImg;}} alt=""></img>
          </div>

          <div className='SearchArticlContainer'>
              <div className='SearchBlockArticleTitleBox'>
                <div className='SearchBlockArticleTitle'>{` ${props.title}`}</div>
              </div>
              <div className='SearchBlockArticleContentBox'>
                <div className='SearchBlockArticleContent'>
                  {props.content}
                </div>
              </div>
              <div className='SearchBlockArticleAuthorContainer'>

                <div className='SearchBlockArticleAuthorPic'>
                  <div className='SearchBlockArticleAuthorPicBox'>
                    <img src={props.memberPic || defaultProfileImg} ></img>
                  </div> 
                </div>

                <div className='SearchBlockArticleAuthorInfo'>

                  <div className='SearchBlockArticleAuthorName'>
                    <h1>{props.memberUserName + ' 님의 작성글' || "무명의 저자 님이 작성함"}</h1>
                  </div>

                  <div className='SearchBlockArticleAuthorDateHit'>
                    <div className='SearchBlockArticleAuthorDate'>{props.boardMDate}</div>
                    <div className='SearchBlockArticleAuthorLike'>Like<h1>{props.like}</h1> </div>
                    <div className='SearchBlockArticleAuthorHit'>Read<h1>{props.hits}</h1></div>                    
                  </div>

                </div>

              </div>
                  
          </div>
          
        
    </div>
  )
}

export default SearchView