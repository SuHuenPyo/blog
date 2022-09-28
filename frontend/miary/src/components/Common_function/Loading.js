/**
 * @author Shun
 * @email vytngms@gmail.com
 * @create date 2022-09-28 16:27:11
 * @modify date 2022-09-28 16:41:56
 * @desc [로딩바 화면 구현을 위한 컴포넌트]
 */
import React from 'react'
import './Loading.scss';
import LoadingImg from "../../assets/img/miary_img/loading.gif"

const Loading = () => {
  return (
    <div className='Loading'>
        <div className='Background'>
            <div className='LoadingText'>
                잠시만 기다려 주세요.
            </div>
            <img src={LoadingImg} alt={'로딩중'} width="50px"></img>
        </div>
    </div>
  )
}

export default Loading