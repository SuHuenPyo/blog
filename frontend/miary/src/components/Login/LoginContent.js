/**
 * @author Shun
 * @email vytngms@gmail.com
 * @create date 2022-09-02 10:37:51
 * @modify date 2022-09-06 00:37:59
 * @desc [마이어리 로그인 모달안의 내용 컴포넌트]
 */
import React, { useEffect, useRef, useState } from 'react'
import { MiaryGetAxios, MiaryPostAxios, ServerUrl } from '../Common_function/MiaryAxios';
import {useSelector, useDispatch, shallowEqual} from "react-redux";
import LoginLogo from "../../assets/img/miary_img/Vertical.png"

import "./LoginContent.scss";
import { postLogin, setRt } from '../../slices/LoginSlice';

export const LoginContent =(props)=> {

    const {rt, rtmsg ,item, loading} = useSelector((state) => state.myLogin, shallowEqual);
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
    const doLogin = async (e)=>{
        e.preventDefault();
        dispatch(postLogin({id:UserIdField, pw:UserPwField}));
        
        console.log("로그인합니다");
    }

    useEffect(()=>{
        //현재 로그인되어있는지 체크필요해 보임 (if(rt === 200) 안그러면 저부분에서 로그인 되어있는 상태에서 로그인 하려하면 계속 로그인성공이라뜸)
        console.log("useEffect 시작 " + rt)
        if(loading) return;
        
        console.log("useEffect 실행");
        if (rt === null) return;

        if (rt === 200){
            window.alert("로그인에 성공했습니다");
            dispatch(setRt(0));
            props.closeModal();
            
        }
        if (rt === 400){
            dispatch(setRt(0));
            

        }

        
        
        
        return;

    }, [loading])

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
                    <label className='placeholder-LoginText' htmlFor="User ID" >
                        <div className='LoginLabelText'>User ID</div>
                    </label>
                </div>
                <div className='Logininput-contain'>
                    <input className='LoginInput' type='password' name="fname" value={UserPwField} onChange={userPwHandler} />
                    <label className='placeholder-LoginText' htmlFor="User Pass" >
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