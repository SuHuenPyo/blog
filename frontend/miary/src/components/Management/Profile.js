import React from 'react'
import Style from '../asset/css/Profile.module.css'

export const Profile = () => {
  return (
    <div>
        <div className={Style.Userimage}>
            <h1>사용자 이미지</h1>
            <div className={Style.Userimage2}></div>
        </div>
        <div className={Style.Userintro}>
            <h1>사용자 소개</h1>
            <div>
                <button className={Style.Update}>업데이트</button>
            </div>
            <div>
                <p className={Style.Userintro2}>포스트 상단에서 작성자를 소개하는 문장입니다. 자신을 한문장으로 표현해 본다면?</p>
            </div>
            <div>
                <textarea>자신을 간단히 설명하세요.</textarea>
            </div>
        </div>
        <div className={Style.socialinfor}>
            <h1>소셜 정보</h1>
            <div>
                <button className={Style.Update}>업데이트</button>
            </div>
            <div>
                <label>개인 홈페이지 주소:</label>
                <div>
                    <span className={Style.Http}>https://</span>
                </div>
                <div>
                    <input type="text"></input>
                </div>
            </div>
            <div>
                <label>깃허브 주소:</label>
                <div>
                    <span>https://github.com/</span>
                </div>
                <div>
                    <input type="text"></input>
                </div>
            </div>
            <div>
                <label>트위터 주소:</label>
                <div>
                    <span>https://twitter.com/</span>
                </div>
                <div>
                    <input type="text"></input>
                </div>
            </div>
            <div>
                <label>페이스북 주소:</label>
                <div>
                    <span>https://facebook.com/</span>
                </div>
                <div>
                    <input type="text"></input>
                </div>
            </div>
            <div>
                <label>인스타그램 주소:</label>
                <div>
                    <span>https://instagram.com/</span>
                </div>
                <div>
                    <input type="text"></input>
                </div>
            </div>
            <div>
                <label>유투브 채널 주소:</label>
                <div>
                    <span>https://youtube.com/channel/</span>
                </div>
                <div>
                    <input type="text"></input>
                </div>
            </div>
        </div>
    </div>
  )
}