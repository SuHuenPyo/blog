/**
 * @author Shun
 * @email vytngms@gmail.com
 * @create date 2022-08-23 13:46:50
 * @modify date 2022-08-23 22:28:07
 * @desc [회원가입을 위한 내용 컴포넌트]
 */
import React, { useEffect } from 'react'
import { useState } from 'react';
import './RegisterContent.scss';
import {FaMailBulk} from 'react-icons/fa';
import { MiaryGetAxios, MiaryPostAxios, ServerUrl } from '../Common_function/MiaryAxios';

export const SignUpContent = ()=>{
    const [UserId, setUserId] = useState("");
    const [UserPassword, setUserPassword] = useState("");
    const [UserName, setUserName] = useState("");
    const [UserEmail, setUserEmail] = useState("");
    const [UserAuthCode, setUserAuthCode] = useState("");

    const userIdHandler = (e) =>{
        e.preventDefault();
        setUserId(e.target.value);
    }
    const userPasswordHandler = (e) => {
        e.preventDefault();
        setUserPassword(e.target.value);
    }
    const userNameHandler = (e) => {
        e.preventDefault();
        setUserName(e.target.value);
    }
    const UserEmailHandler = (e)=>{
        e.preventDefault();
        setUserEmail(e.target.value);
    }

    //submit
    const submitHandler = async(e) =>{
        e.preventDefault();

        //console.log("id : " + UserId + "  userPassword: " + UserPassword + "  UserName : " + UserName + "   UserEmail : " + UserEmail);

        let body = {
            id: UserId,
            pw: UserPassword,
            name: UserName,
            email: UserEmail,
            authCode: UserAuthCode
        };

        let result = await MiaryPostAxios(ServerUrl+"user", body);
        console.log(result);
    }

    //authcode
    const userAuthCodeHandler = (e) =>{
        e.preventDefault();
        setUserAuthCode(e.target.value);
    }
    const sendAuthHandler = async(e) =>{
        e.preventDefault();
        
        let result = await MiaryGetAxios(ServerUrl+"mail","발급성공", "발급실패", {'email': UserEmail});
        console.log(result);
        if(result){
            console.log("발급성공했네요");
        }
    }
    

    return(
        <div className='SignUpContentBackgroundWrap'>
            <div className='SignUpContent'>
                <div className='RegisterModalTitle'>마이어리 회원등록</div>
                {/* react에서는 action, method안씀 */}

                <form onSubmit={submitHandler}>
                    <input className='RegisterInput' type='text' placeholder='사용자의 아이디' onChange={userIdHandler}></input>
                    <input className='RegisterInput' type='password' placeholder='패스워드' onChange={userPasswordHandler}></input>
                    <input className='RegisterInput' type='password' placeholder='패스워드 확인' ></input>
                    <input className='RegisterInput' type='text' placeholder='사용자의 실명' onChange={userNameHandler}></input>
                    <input className='RegisterInput' type='text' placeholder='사용자의 이메일' onChange={UserEmailHandler}></input>
                

                    <div className='AuthBox'>
                        <input className='AuthInputText' type='text' placeholder='이메일 인증번호 6자리' onChange={userAuthCodeHandler}></input>
                        <input className='AuthBtn' type='button' value={'인증번호 발송'} onClick={sendAuthHandler}></input>
                    </div>

                    <input className='' type='submit' value={"회원가입"} ></input>
                    

                    <div className="RegisterHorizon">―― or social sign in ―― </div>
                    <div className="social-button google-connect"> Google 계정으로 시작하기</div>
                </form>
            </div>
      </div>
  
    );
}

export default SignUpContent;