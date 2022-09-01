/**
 * @author Shun
 * @email vytngms@gmail.com
 * @create date 2022-09-01 14:53:33
 * @modify date 2022-09-01 15:48:27
 * @desc [나의 블로그 관리탭 > Summary 를 위한 css]
 */
import React from 'react'
import './Summary.scss';


import replaceEmptyImg from '../../assets/img/miary_img/cats-7122943.png'

export const Summary = () => {

  return (
    <div className='Summary'>
      <div className='SummaryContainer'>
        {null || 
          <div className='SummaryEmptyContentReplaceImg'>
            <img src={replaceEmptyImg}/>
            생성된 최근 포스트가 없습니다.
          </div>
        }
          
      </div>
      

    </div>
  )
}

export default Summary;