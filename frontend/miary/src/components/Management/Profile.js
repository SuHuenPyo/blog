import React from 'react'
import Style from '../../assets/css/Profile.module.css'

export const Profile = () => {
  return (
    <div className={Style.Fullprofile}>
        <div className={Style.Userimage}>
            <h1>사용자 이미지</h1>
            <div className={Style.Userimage2}></div>
        </div>
        <div className={Style.Userintro}>
            <div className={Style.Buttonop}>
                <h1>사용자 소개</h1>
                <button className={Style.Update}>업데이트</button>
            </div>
            <div>
                <p className={Style.Userintro2}>포스트 상단에서 작성자를 소개하는 문장입니다. 자신을 한문장으로 표현해 본다면?</p>
            </div>
            <div>
                <textarea placeholder="자신을 간단히 설명하세요."></textarea>
            </div>
        </div>
        <div className={Style.Socialinfor}>
            <div className={Style.Buttonop}>
                <h1>소셜 정보</h1>
                <button className={Style.Update}>업데이트</button>
            </div>
            <div className={Style.Address}>
                <label>개인 홈페이지 주소:</label>
                <span>https://</span>
                <input type="text" className={Style.Homepage}></input>
            </div>
            <div className={Style.Address}>
                <label>깃허브 주소:</label>
                <span>https://github.com/</span>
                <input type="text" className={Style.Github}></input>
            </div>
            <div className={Style.Address}>
                <label>트위터 주소:</label>
                <span>https://twitter.com/</span>
                <input type="text" className={Style.Twitter}></input>
            </div>
            <div className={Style.Address}>
                <label>페이스북 주소:</label>
                <span>https://facebook.com/</span>
                <input type="text" className={Style.Facebook}></input>
            </div>
            <div className={Style.Address}>
                <label>인스타그램 주소:</label>
                <span>https://instagram.com/</span>
                <input type="text" className={Style.Instagram}></input>
            </div>
            <div className={Style.Address}>
                <label>유투브 채널 주소:</label>
                <span>https://youtube.com/channel/</span>
                <input type="text" className={Style.Youtube}></input>
            </div>
        </div>
    </div>
  )
}

export default Profile;