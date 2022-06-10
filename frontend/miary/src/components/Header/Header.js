import {useState, useEffect, useRef} from 'react'
import styled from 'styled-components';
import './Header.scss';

import {
    FaSearch, // 돋보기
    FaBell,
    FaGreaterThanEqual, //종(알림)    
} from 'react-icons/fa';

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

    
  return (
    <header className={hide && 'hide'}>
        
        {/* <div className={hide ? 'HeaderContainer' + 'HeaderContainer:hide' : 'HeaderContainer'}> */}
        <div className='HeaderContainer'>
            <div className='HeaderLogo'><img src={require('../../assets/img/miary_img/Symbol.png')}></img></div>
            <div className='HeaderBlank'></div>

            <div className='HeaderToolsContainer'>
                
                <ul>
                    <li><a href="#"><FaSearch/></a></li>
                    <li><a href="#"><FaBell/></a></li>
                    <li><a href="#">{props.tools1}</a></li>
                    <li><a href="#">{props.tools2}</a></li>
                </ul>
            </div>

        </div>

    </header>

  )
}

export default Header;