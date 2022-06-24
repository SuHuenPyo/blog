import React from 'react'
import { useState } from 'react';
import './SideBarModal.scss';
import {FaMailBulk} from 'react-icons/fa';

export const SideBarModal = (props) => {
  return (
    <div className='SideBarModal'> 
        <div className={`SideBarModalBackground ${props.showModal ? '' : 'hide'}`}>
          
          <div className='SideBarModalContainer'>
            <div className='SideBarModalTitle'>회원등록</div>
            <form action="#" mothod="POST">
              <input className='RegisterInput' type='text' placeholder='사용자의 아이디'></input>
              <input className='RegisterInput' type='password' placeholder='패스워드'></input>
              <input className='RegisterInput' type='password' placeholder='패스워드 확인'></input>
              <input className='RegisterInput' type='text' placeholder='사용자의 실명'></input>
              <input className='RegisterInput' type='text' placeholder='사용자의 이메일'></input>
              
              <input className="social-button register-button " type='submit' value={'등록 후 이메일 인증하기'}></input>
              <div className="RegisterHorizon"> or social sign in </div>
              <div className="social-button google-connect"> Connect with Google</div>
            </form>
            
          </div>
        </div>
    </div>
  )
}

export default SideBarModal;