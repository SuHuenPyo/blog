/**
 * @author Shun
 * @email vytngms@gmail.com
 * @create date 2022-08-23 13:47:08
 * @modify date 2022-08-23 14:39:52
 * @desc [회원가입을 위한 모달 컴포넌트]
 */
import React, { useEffect } from 'react'
import { useState } from 'react';
import './RegisterModal.scss';
import {FaMailBulk} from 'react-icons/fa';



export const RegisterModal = (props) =>{

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

  const closeModal = ()=>{
    props.closeModal();
  }

  return (
    <div className='RegisterModal' onClick={closeModal}>
      <div className='RegisterModalBody' onClick={(e)=> e.stopPropagation()}>
        <button id="RegisterModalCloseBtn" onClick={closeModal}> X </button>
        {props.children}

      </div>
    </div>
  );
}



export default RegisterModal;