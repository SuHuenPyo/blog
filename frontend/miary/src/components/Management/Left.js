import React from 'react'
import Style from '../../assets/css/Left.module.css'
import { Link } from 'react-router-dom'

export const Left = () => {
  return (
    <div className={Style.Left}>
      <div className={Style.MU}>
        사용자 관리
      </div>
        <div className={Style.MU1}>
          <Link to="/Management/Account">
              <div className={Style.Account}>계정</div>
          </Link>
          <Link to="/Management/Profile">
            <div className={Style.Profile}>프로필</div>
          </Link>
        </div>
      <div className={Style.PM}>
        포스트 관리
      </div>
        <div className={Style.PM1}>
          <Link to="/Management/Post">
            <div className={Style.Post}>포스트</div>
          </Link>
          <Link to="/Management/Form">
            <div className={Style.Form}>서식</div>
          </Link>
        </div>
    </div>
  )
}

export default Left;