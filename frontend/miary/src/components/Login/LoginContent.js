/**
 * @author Shun
 * @email vytngms@gmail.com
 * @create date 2022-09-02 10:37:51
 * @modify date 2022-09-03 11:13:46
 * @desc [마이어리 로그인 모달안의 내용 컴포넌트]
 */
import React, { useEffect, useRef, useState } from 'react'
import { MiaryGetAxios, MiaryPostAxios, ServerUrl } from '../Common_function/MiaryAxios';
import {useSelector, useDispatch, shallowEqual} from "react-redux";
import LoginLogo from "../../assets/img/miary_img/Vertical.png"

import "./LoginContent.scss";

export const LoginContent =()=> {

    const {rt, item, loading} = useSelector((state) => state.myLogin, shallowEqual);
    const dispatch = useDispatch();

    const [show,setShow] = useState(false);
    const [password, setPassword] = useState(true);
    const [notice, setNotice] = useState({title: null, subTitle: null});





    //빈값 체크 (css 변경) and 폼 필드 저장 
    const [UserIdField, setUserIdField] = useState("");
    const [UserPwField, setUserPwField] = useState("");
    const userIdHandler = (e) =>{setUserIdField(e.target.value);}
    const userPwHandler = (e) =>{setUserPwField(e.target.value);}
    
    //폼 전송 
    const doLogin = ()=>{
        console.log("로그인합니다");
    }

  return (
    <div className='LoginContentBackgroundWrap'>
        <div className='LoginFoldedRibbon'>Sign In</div>
        <div className='LoginContentMiaryLogo'>
            <img src={LoginLogo} alt={'마이어리 로그인 로고'}/>
        </div>
        <div className='LoginContentContainer'>
            Love yourself
            <form onSubmit={doLogin}>
                
                <div className='Logininput-contain'>
                    <input className='LoginInput' type='text' name="fname" value={UserIdField} onChange={userIdHandler} />
                    <label className='placeholder-LoginText' for="fname" >
                        <div className='LoginLabelText'>User ID</div>
                    </label>
                </div>
                <div className='Logininput-contain'>
                    <input className='LoginInput' type='password' name="fname" value={UserPwField} onChange={userPwHandler} />
                    <label className='placeholder-LoginText' for="fname" >
                        <div className='LoginLabelText'>User Pass</div>
                    </label>
                </div>
                <input className='RegisterInputSubmit' type='submit' value={"로그인"}/>
                <div className="RegisterHorizon">―― or social sign in ―― </div>
                <div className="social-button google-connect"> Google 계정으로 시작하기</div>
            </form>
        </div>
            
    </div>
  
  )
}

export default LoginContent