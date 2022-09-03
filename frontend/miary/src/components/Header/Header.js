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
    const MairyStartDate = new Date(2022, 5, 2);

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

    // const [showModal, setShowModal] = useState(false);

    // const openModal = () => {
    //   setShowModal(true);
    // }
    
    const switchModalRegister = ()=>{
        setSignUp(!signUp);
    }
    const switchModalLogin = ()=>{
        setLogin(!Login);
    }

  return (
    // error point
    <header className={hide && 'hide'}>
        
        {/* <div className={hide ? 'HeaderContainer' + 'HeaderContainer:hide' : 'HeaderContainer'}> */}
        <div className='HeaderContainer'>
            <div className='HeaderLogo'><Link to="/"><img src={require('../../assets/img/miary_img/Symbol.png')}></img></Link></div>
            <div className='HeaderBlank'></div>

            <div className='HeaderToolsContainer'>
                
                <ul>
                    <li><a href="#"><FaSearch/></a></li>
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
                    <li className="accountBtn" onClick={switchModalRegister}>
                        회원가입
                        {signUp && (
                            <AccountModal closeModal={()=> switchModalRegister(!signUp)}>
                                <SignUpContent/>
                            </AccountModal>
                        )}
                    </li>
                    <li className="accountBtn" onClick={switchModalLogin}>
                        로그인
                        {Login && (
                            <AccountModal closeModal={()=> switchModalLogin(!Login)}>
                                <LoginContent/>
                            </AccountModal>
                        )}
                    </li>
                </ul>
            </div>

        </div>

        {/* <RegisterModal showModal={showModal} closeModal={closeModal}></RegisterModal> */}
    </header>

  )
}

export default Header;