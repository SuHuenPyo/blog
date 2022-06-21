import React from 'react'
import Style from '../asset/css/Account.module.css'

export const Account = () => {
  return (
    <div>
        <div className={Style.Since}>
            <h1 className ={Style.Member}>가입일</h1>
                <h3 className ={Style.Date}>2022년 5월 31일</h3>
        </div>
        <div className={Style.text}>
            <h1 className={Style.Penname}>사용자 필명
            </h1>
        </div>
        <div>
            <button className={Style.Change}>변경</button>
            <p className={Style.Explanation}>
                사용자의 필명은 로그인시 사용되며 주소(URL)에 표기되는 이름입니다.
            </p>
        </div>
        <div>
            <div>
                ID
            </div>
        </div>
        <div>
            <h1>이메일</h1>
        </div>
        <div>
            <h1>사용자 실명</h1>
            <button className={Style.Update}>업데이트</button>
            <p className={Style.Explanation}>
                반드시 실명일 필요는 없으나 실명 사용을 권장합니다.
            </p>
            <input type="text" name="name" placeholder="이름"
            className={Style.name}></input>
        </div>
        <div>
            <h1>비밀번호 변경</h1>
            <button className={Style.Update}>업데이트</button>
        </div>
        <div>
            <input type='password' name='password' placeholder='새 비밀번호'
            className={Style.password}>
            </input>
        </div>
        <div>
        <input type='password' name='passwordcheck' placeholder='비밀번호 확인'  className={Style.passwordcheck}>
        </input>
        </div>
        <div>
            <h1>개인정보 보호</h1>
            <button className={Style.Update}>업데이트</button>
            <form>
                <div className={Style.PIP}>
                    <input type='checkbox' name='Protection'></input>
                    <label>다른 사용자에게 이메일을 노출합니다.</label>
                </div>
                <div className={Style.PIP}>
                    <input type='checkbox' name='Protection'></input>
                    <label>서비스의 이메일 전송을 허용합니다.</label>
                </div>
                <div className={Style.PIP}>
                    <input type='checkbox' name='Protection'></input>
                    <label>서비스의 활동 내역 수집을 허용합니다.</label>
                </div>
            </form>
        </div>
        <div>
            <button className={Style.Certified}>2차 인증 등록</button>
            <button className={Style.Out}>사용자 탈퇴</button>
        </div>
    </div>
  )
}