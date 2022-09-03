/**
 * @author Shun
 * @email vytngms@gmail.com
 * @create date 2022-08-23 13:47:08
 * @modify date 2022-09-03 11:56:45
 * @desc [회원가입을 위한 모달 컴포넌트]
 */
import React, { useContext, useEffect } from 'react'
import { useState } from 'react';
import './AccountModal.scss';
import {FaMailBulk} from 'react-icons/fa';
import { UNSAFE_NavigationContext } from 'react-router-dom';



export const AccountModal = (props) =>{

  useEffect(()=>{
    document.body.style.cssText = `
    position: fixed; 
    top: -${window.scrollY}px;
    overflow-y: scroll;
    width: 100%;`;
  return () => {
    const scrollY = document.body.style.top;
    document.body.style.cssText = '';
    window.scrollTo(0, parseInt(scrollY || '0', 10) * -1);
  };
  }, []);

  const closeModal = (e)=>{
    e.preventDefault();
    props.closeModal();
  }

  //뒤로이동 버튼 감지 (뒤로가기시에 모달창 종료를 위해서)
  const {navigator} = useContext(UNSAFE_NavigationContext);

  useEffect(()=>{
      const unblock = navigator.block(()=>{
          props.closeModal();
      })
      return unblock;
  },[]);

  return (
    <div className='RegisterModal' onClick={(e)=>e.stopPropagation()} >
      <div className='RegisterBody'>
        <button className='RegisterModalCloseBtn' onClick={closeModal} > X </button>
        {props.children}
      </div>


    </div>
  );
}



export default AccountModal;