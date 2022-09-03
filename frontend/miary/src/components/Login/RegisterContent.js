/**
 * @author Shun
 * @email vytngms@gmail.com
 * @create date 2022-08-23 13:46:50
 * @modify date 2022-09-03 11:35:55
 * @desc [회원가입을 위한 내용 컴포넌트]
 */
import React, { useContext, useEffect, useRef } from 'react'
import { useState } from 'react';
import './RegisterContent.scss';
import {FaMailBulk} from 'react-icons/fa';
import { MiaryGetAxios, MiaryPostAxios, ServerUrl } from '../Common_function/MiaryAxios';
import RegisterLogo from "../../assets/img/miary_img/Vertical.png"
import { UNSAFE_NavigationContext, useNavigate } from 'react-router-dom';

export const SignUpContent = ()=>{
    
    //input 필드값 저장
    const [UserId, setUserId] = useState("");
    const [UserPassword, setUserPassword] = useState("");
    const [UserName, setUserName] = useState("");
    const [UserEmail, setUserEmail] = useState("");
    const [UserAuthCode, setUserAuthCode] = useState("");

    //css 변경을 위한 Ref 
    const RefId = useRef();
    const RefPw = useRef();
    const RefName = useRef();
    const RefEmail = useRef();
    const resetCssStyle = (targetRef) => {if(targetRef.current?.style) targetRef.current.style=``;}


    //event listener
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

        // aaID.current.style = `
        // border-color: red;
        // animation: vibration 0.1s 5;
        // `

        
        

        //console.log("id : " + UserId + "  userPassword: " + UserPassword + "  UserName : " + UserName + "   UserEmail : " + UserEmail);

        let body = {
            id: UserId,
            pw: UserPassword,
            name: UserName,
            email: UserEmail,
            authCode: UserAuthCode
        };

        let result = await MiaryPostAxios(ServerUrl+"user", body);

        
    }

    //authcode
    const userAuthCodeHandler = (e) =>{
        e.preventDefault();
        setUserAuthCode(e.target.value);
    }
    const sendAuthHandler = async(e) =>{
        e.preventDefault();
        
        let result = await MiaryGetAxios(ServerUrl+"mail","발급성공", "발급실패", {'email': UserEmail});
        
        if(result){
            console.log("발급성공했네요");
        }
    }
    
    

    

    return(
        <div className='SignUpContentBackgroundWrap'>
            <div className='RegisterFoldedRibbon'>Sign Up</div>
            <div className='RegisterContentMiaryLogo'>
                <img src={RegisterLogo} alt={'마이어리 로그인 로고'}/>
            </div>
            <div className='RegisterContentContainer'>
                Love yourself
                <form onSubmit={submitHandler}>

                    <div className='Registerinput-contain'>
                        <input className='RegisterInput' ref={RefId} type='text' name="fname" value={UserId} onChange={userIdHandler} onClick={resetCssStyle(RefId)} />
                        <label className='placeholder-RegisterText' for="fname" >
                            <div className='RegisterLabelText'>유저 아이디</div>
                        </label>
                    </div>
                    <div className='Registerinput-contain'>
                        <input className='RegisterInput' ref={RefPw} type='password' name="fname" value={UserPassword} onChange={userPasswordHandler} onClick={resetCssStyle(RefPw)} />
                        <label className='placeholder-RegisterText' for="fname" >
                            <div className='RegisterLabelText'>유저 패스워드</div>
                        </label>
                    </div>
                    <div className='Registerinput-contain '>
                        <input className='RegisterInput' ref={RefName} type='text' name="fname" value={UserName} onChange={userNameHandler} onClick={resetCssStyle(RefName)} />
                        <label className='placeholder-RegisterText' for="fname" >
                            <div className='RegisterLabelText'>유저이름(닉네임) </div>
                        </label>
                    </div>
                    <div className='Registerinput-contain'>
                        <input className='RegisterInput' ref={RefEmail} type='text' name="fname" value={UserEmail} onChange={UserEmailHandler} onClick={resetCssStyle(RefEmail)} />
                        <label className='placeholder-RegisterText' for="fname" >
                            <div className='RegisterLabelText'>유저 이메일</div>
                        </label>
                    </div>
                    <div className='Registerinput-contain'>
                        <input className='RegisterInput Registerinput-Auth' type='text' name="fname" placeholder='인증코드 6자리' value={UserAuthCode} onChange={userAuthCodeHandler} />
                        <div className='BtnSendAuthCode'>인증코드 전송</div>
                    </div>

                    <input className='RegisterInputSubmit' type='submit' value={"가입하기"}/>

                </form>
                    <div className="RegisterHorizon">―― or social sign Up ―― </div>
                    <div className="social-button google-connect"> Google 계정으로 시작하기</div>
            </div>
            
      </div>
  
    );
}

export default SignUpContent;