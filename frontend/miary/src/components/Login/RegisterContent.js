/**
 * @author Shun
 * @email vytngms@gmail.com
 * @create date 2022-08-23 13:46:50
 * @modify date 2022-09-20 07:48:29
 * @desc [회원가입을 위한 내용 컴포넌트]
 */
import React, { useContext, useEffect, useRef } from 'react'
import { useState } from 'react';
import './RegisterContent.scss';
import {FaMailBulk} from 'react-icons/fa';
import { MiaryGetAxios, MiaryPostAxios, ServerUrl } from '../Common_function/MiaryAxios';
import RegisterLogo from "../../assets/img/miary_img/Vertical.png"
import { Navigate, UNSAFE_NavigationContext, useNavigate } from 'react-router-dom';
import {RegexHelper} from './../Common_function/RegexHelper'

export const SignUpContent = ()=>{
    
    //input 필드값 저장
    const [UserId, setUserId] = useState("");
    const [UserPassword, setUserPassword] = useState("");
    const [UserName, setUserName] = useState("");
    const [UserEmail, setUserEmail] = useState("");
    const [UserAuthCode, setUserAuthCode] = useState("");

    //에러처리를 위한 textFiled 저장값
    const [AlertId, setAlertId] = useState("유저 아이디(영문시작 3자이상)");
    const [AlertPw, setAlertPw] = useState("패스워드(a+A+숫자+특수 5자리이상)");
    const [AlertName, setAlertName] = useState("유저 이름(2자이상)");
    const [AlertMail, setAlertMail] = useState("유저 이메일(example@gmail.com)");
    
    //페이지 이동을 위한 useNavigate
    const navigate = useNavigate();

   
    //css 변경을 위한 Ref 
    const RefId = useRef();
    const RefPw = useRef();
    const RefName = useRef();
    const RefEmail = useRef();
    const resetCssStyle = (targetRef) =>  targetRef.target.style=``;
    


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

        //잘못되거나 틀린값에 대한 시각적 표시
        let regex = new RegexHelper();

        if(
            !regex.value(UserId) || 
            !regex.length(UserId, 3, 50) ||
            !regex.idTest(UserId)
        ){
            RefId.current.style = `border-color: red;  animation: vibration 0.1s 5;`;
            return;
        } 
        else if(
            !regex.value(UserPassword) ||
            !regex.length(UserPassword, 5, 50) ||
            !regex.pwTest(UserPassword)
        ) {
            RefPw.current.style = `border-color: red;  animation: vibration 0.1s 5;`;
            return;
        }
        else if(
            !regex.value(UserName) ||
            !regex.length(UserName, 2, 45)

        ) {
            RefName.current.style = `border-color: red;  animation: vibration 0.1s 5;`;
            return;
        }
        else if(
            !regex.value(UserEmail) ||
            !regex.length(UserName, 3, 50) ||
            !regex.email(UserEmail) 
        ) {
            RefEmail.current.style = `border-color: red;  animation: vibration 0.1s 5;`;
            return;
        }
        
        

        
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
        if(result.data){
            navigate(-1);
            window.alert("회원가입이 완료되었습니다. 로그인 해주세요.");
        }else{
            window.alert(result.response.data);
        }
        

        

        
    }

    //authcode
    const userAuthCodeHandler = (e) =>{
        e.preventDefault();
        setUserAuthCode(e.target.value);
    }
    const sendAuthHandler = async(e) =>{
        e.preventDefault();
        
        let result = await MiaryGetAxios(ServerUrl+"mail","발급성공", "발급실패", {'email': UserEmail});
        
        window.alert(result ? "인증번호가 발급되었습니다. 이메일을 확인하고 인증번호를 입력해주세요." : "인증번호 발급에 실패했습니다. 이미가입했거나 사용할 수 없는 이메일입니다.");
        
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
                        <input className='RegisterInput' ref={RefId} type='text' name="fname" value={UserId} onChange={userIdHandler} onFocus={ resetCssStyle} />
                        <label className='placeholder-RegisterText' htmlFor="fname" >
                            <div className='RegisterLabelText'>{ AlertId }</div>
                        </label>
                    </div>
                    <div className='Registerinput-contain'>
                        <input className='RegisterInput' ref={RefPw} type='password' name="fname" value={UserPassword} onChange={userPasswordHandler} onClick={ resetCssStyle} />
                        <label className='placeholder-RegisterText' htmlFor="fname" >
                            <div className='RegisterLabelText'>{AlertPw }</div>
                        </label>
                    </div>
                    <div className='Registerinput-contain '>
                        <input className='RegisterInput' ref={RefName} type='text' name="fname" value={UserName} onChange={userNameHandler} onClick={resetCssStyle} />
                        <label className='placeholder-RegisterText' htmlFor="fname" >
                            <div className='RegisterLabelText'>{AlertName } </div>
                        </label>
                    </div>
                    <div className='Registerinput-contain'>
                        <input className='RegisterInput' ref={RefEmail} type='text' name="fname" value={UserEmail} onChange={UserEmailHandler} onClick={resetCssStyle} />
                        <label className='placeholder-RegisterText' htmlFor="fname" >
                            <div className='RegisterLabelText'>{AlertMail}</div>
                        </label>
                    </div>
                    <div className='Registerinput-contain'>
                        <input className='RegisterInput Registerinput-Auth' type='text' name="fname" placeholder='인증코드 6자리' value={UserAuthCode} onChange={userAuthCodeHandler} />
                        <div className='BtnSendAuthCode' onClick={sendAuthHandler}>인증코드 전송</div>
                    </div>

                    <input className='RegisterInputSubmit' type='submit' value={"가입하기"} />

                </form>
                    {/* <div className="RegisterHorizon">―― or social sign Up ―― </div>
                    <div className="social-button google-connect"> Google 계정으로 시작하기</div> */}
            </div>
            
      </div>
  
    );
}

export default SignUpContent;