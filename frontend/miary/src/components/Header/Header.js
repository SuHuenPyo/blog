import {useState, useEffect, useRef} from 'react';
import React, {Component} from 'react';
import styled from 'styled-components';
import './Header.scss';

import {
    FaSearch, // 돋보기
    FaBell,
    FaGreaterThanEqual, //종(알림) 
       
} from 'react-icons/fa';
import { Link } from 'react-router-dom';
import AccountModal from '../Login/AccountModal';
import SignUpContent from '../Login/RegisterContent';
import LoginContent from '../Login/LoginContent';

//redux;
import {useSelector, useDispatch} from "react-redux";
import { getLogout} from '../../slices/LogoutSlice';
import useInterval from '../Common_function/useInterval';
import axios from 'axios';
import { ServerUrl } from '../Common_function/MiaryAxios';


const throttle = function (callback, waitTime) {
    let timerId = null;
    return (e) => {
        if (timerId) return;
        timerId = setTimeout(() => {
            callback.call(this, e);
            timerId = null;
        }, waitTime);
    };
};


export const Header = (props) => {
    //const MairyStartDate = new Date(2022, 5, 2);

    //로컬 스토리지
    const userName = sessionStorage.getItem("userName");
    const userImage = sessionStorage.getItem("userImage");

    //console.log(userName, userImage);

    //스크롤 감지 헤더숨김
    const [hide, setHide] = useState(false);
    const [pageY, setPageY] = useState(0);

    //회원가입, 로그인 모달창 스위치
    const [signUp, setSignUp] = useState(false);
    const [Login, setLogin] = useState(false);
    
    const documentRef = useRef(document);

    const handleScroll = () => {
        const { pageYOffset } = window;
        const deltaY = pageYOffset - pageY;
        const hide = pageYOffset !== 0 && deltaY >= 0;
        setHide(hide);
        setPageY(pageYOffset);
    };

    const throttleScroll = throttle(handleScroll, 50);

    useEffect(() => {
        documentRef.current.addEventListener('scroll', throttleScroll);
        return () => documentRef.current.removeEventListener('scroll', throttleScroll);
    }, [pageY]);


    
    const switchModalRegister = ()=>{
        setSignUp(!signUp);
    }
    const switchModalLogin = ()=>{
        setLogin(!Login);
    }


    //로그아웃을 위한
    const {rt, rtmsg, item, loading} = useSelector((state)=> state.myLogout);
    const dispatch = useDispatch();

    const LogoutHandler = () => {
        dispatch(getLogout({}));
        
    }
    //맨처음 들어올때 세션있는지 체크 
    useEffect(()=>{
        (async()=>{
            let userInfo = null;
            try{
                userInfo = await axios.get(ServerUrl+ "profile/userinfo");
                sessionStorage.setItem("userName", userInfo.data.name);
                sessionStorage.setItem("userImage",userInfo.data.image);
                console.log("사용자 정보 덮어씌움");
                
            }catch(err){
                console.log(err.response);
                sessionStorage.clear();
                console.log("사용자 세션스토리지 삭제");
            }
            
        })()
    },[])



    //1분마다 지속적인 세션검증 & 유효세션 체크를 위한 타이머 
    useInterval(()=>{
        // setCount(count => count+1);
        // console.log(count);

            (async()=>{
                let userInfo = null;
                try{
                    userInfo = await axios.get(ServerUrl+ "profile/userinfo");
                    sessionStorage.setItem("userName", userInfo.data.name);
                    sessionStorage.setItem("userImage",userInfo.data.image);
                    console.log("사용자 정보 덮어씌움");
                    
                }catch(err){
                    console.log(err.response);
                    sessionStorage.clear();

                    

                    console.log("사용자 세션스토리지 삭제");
                }
                
            })()
           
        
    }, 60000)
    
  return (
    // error point
    <header className={hide && 'hide'}>
        
        {/* <div className={hide ? 'HeaderContainer' + 'HeaderContainer:hide' : 'HeaderContainer'}> */}
        <div className='HeaderContainer'>
            <div className='HeaderLogo'><Link to="/"><img src={require('../../assets/img/miary_img/Symbol.png')}></img></Link></div>
            <div className='HeaderBlank'></div>

            <div className='HeaderToolsContainer'>
                
                <ul>
                    <li><a href="#">
                        <Link to='/search'>
                            <FaSearch/>
                        </Link>
                    </a></li>
                    <li>

                        <Link to="/write_post">
                            글 쓰기
                        </Link>

                        
                    </li>
                    <li>
                        <Link to="/myblog">
                            프로필
                        </Link>
                    </li>
                    {
                        !userName && 
                        <li className="accountBtn" onClick={switchModalRegister}>
                        회원가입
                        {signUp && (
                            <AccountModal closeModal={()=> switchModalRegister(!signUp)}>
                                <SignUpContent/>
                            </AccountModal>
                        )}
                        </li>
                
                    }
                    {
                        !userName &&
                        <li className="accountBtn" onClick={switchModalLogin}>
                        로그인
                        {Login && (
                            <AccountModal closeModal={()=> switchModalLogin(!Login)}>
                                <LoginContent closeModal={()=>switchModalLogin(!Login)}/>
                            </AccountModal>
                        )}
                         </li>
                
                    }
                    {
                        userName && 
                        <li className="accountBtn" onClick={LogoutHandler}>로그아웃</li>
                    }
                    
                </ul>
            </div>

        </div>

        {/* <RegisterModal showModal={showModal} closeModal={closeModal}></RegisterModal> */}
    </header>

  )
}

export default Header;