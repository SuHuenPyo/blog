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
import RegisterModal from '../Login/RegisterModal';
import SignUpContent from '../Login/RegisterContent';

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
    //회원가입 모달창 스위치
    const [signUp, setSignUp] = useState(false);
    
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
    
    const switchModal = ()=>{
        setSignUp(!signUp);
    }

  return (
    // error point
    <header className={hide && 'hide'}>
        
        {/* <div className={hide ? 'HeaderContainer' + 'HeaderContainer:hide' : 'HeaderContainer'}> */}
        <div className='HeaderContainer'>
            <div className='HeaderLogo'><Link to="/home"><img src={require('../../assets/img/miary_img/Symbol.png')}></img></Link></div>
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
                    <li>
                        <input type="button" value="회원가입" className="RegisterBtn" onClick={switchModal}/> 
                        {/* <button onClick={openModal}>임시로그인</button> */}
                        {signUp && (
                            <RegisterModal closeModal={()=> setSignUp(!signUp)}>
                                <SignUpContent/>
                            </RegisterModal>
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