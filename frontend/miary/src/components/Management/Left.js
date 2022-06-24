import React from 'react'
import Style from '../../assets/css/Left.module.css'

export const Left = () => {
  return (
    <div className={Style.Left}>
      <div className={Style.MU}>
        사용자 관리
        </div>
          <div className={Style.MU1}>
            <a href="/">
              <div className={Style.Account}>계정</div>
            </a>
            <a href="/">
              <div className={Style.Profile}>프로필</div>
            </a>
          </div>
        <div className={Style.PM}>
          포스트 관리
        </div>
            <div className={Style.PM1}>
              <a href="/">
                <div className={Style.Post}>포스트</div>
              </a>
              <a href="/">
                <div className={Style.Form}>서식</div>
              </a>
            </div>
    </div>
  )
}

export default Left;