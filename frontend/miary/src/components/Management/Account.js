import React from 'react'
import Style from '../../assets/css/Account.module.css'


export const Account = () => {
  return (
    <div className={Style.Fullaccount}>
        <div className={Style.Since}>
            <h1 className ={Style.Since1}>가입일</h1>
                <h3 className ={Style.Date1}>2022년 5월 31일</h3>
        </div>
        <div className={Style.Pname}>
            <div className={Style.Buttonoption}>
                <h1 className={Style.Pname1}>사용자 필명
                </h1>
                <button className={Style.Change}>변경</button>
            </div>
            <div>
                <p className={Style.Explanation}>
                    사용자의 필명은 로그인시 사용되며 주소(URL)에 표기되는 이름입니다.
                </p>
            </div>
            <div>
                ID
            </div>
        </div>
        <div className={Style.email}>
            <h1>이메일</h1>
        </div>
        <div className={Style.Rname}>
            <div className={Style.Buttonoption}>
                <h1>사용자 실명</h1>
                <button className={Style.Update}>업데이트</button>
            </div>
            <p className={Style.Explanation}>
                반드시 실명일 필요는 없으나 실명 사용을 권장합니다.
            </p>
            <input type="text" name="name" placeholder="이름"
            className={Style.Rname1}></input>
        </div>
        <div className={Style.Password}>
            <div className={Style.Buttonoption}>
                <h1>비밀번호 변경</h1>
                <button className={Style.Update}>업데이트</button>
            </div>
            <div>
                <input type='password' name='password1' placeholder='새 비밀번호'
                className={Style.Password1}>
                </input>
            </div>
            <div>
            <input type='password' name='Passwordcheck' placeholder='비밀번호 확인'  className={Style.Passwordcheck}>
            </input>
            </div>
        </div>
        <div className={Style.Privacy}>
            <div className={Style.Buttonoption}>
                <h1>개인정보 보호</h1>
                <button className={Style.Update}>업데이트</button>
            </div>
            <form>
                <div className={Style.PIP}>
                    <input type='checkbox' name='Protection' id="Protection1"></input>
                    <label for="Protection1">다른 사용자에게 이메일을 노출합니다.</label>
                </div>
                <div className={Style.PIP}>
                    <input type='checkbox' name='Protection' id="Protection2"></input>
                    <label for="Protection2">서비스의 이메일 전송을 허용합니다.</label>
                </div>
                <div className={Style.PIP}>
                    <input type='checkbox' name='Protection' id="Protection3"></input>
                    <label for="Protection3">서비스의 활동 내역 수집을 허용합니다.</label>
                </div>
            </form>
        </div>
        <div className={Style.Lastbutton}>
            <button className={Style.Certified}>2차 인증 등록</button>
            <button className={Style.Out}>사용자 탈퇴</button>
        </div>
    </div>
  )
}

export default Account;