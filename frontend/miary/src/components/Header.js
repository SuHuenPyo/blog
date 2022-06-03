import {useState, useEffect, useRef} from 'react'
import styled from 'styled-components';
import '../assets/css/Header.scss';

import {
    FaSearch, // 돋보기
    FaBell, //종(알림)    
} from 'react-icons/fa';


export const Header = (props) => {
    const MairyStartDate = new Date(2022, 5, 2);

    //스크롤 감지 헤더숨김
    const [scrollPosition, setScrollPosition] = useState(0);
    const updateScroll = () => {
        setScrollPosition(window.scrollY || document.documentElement.scrollTop);
    }
    useEffect(()=>{
        window.addEventListener('scroll', updateScroll);
    });

  return (
    <header>

        <div className='HeaderContainer'>
            <div className='HeaderLogo'><img src={require('./../assets/img/miary_img/Symbol.png')}></img></div>
            <div className='HeaderBlank'>공백</div>

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

