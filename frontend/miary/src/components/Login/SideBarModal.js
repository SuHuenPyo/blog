import React from 'react'
import { useState } from 'react';
import './SideBarModal.scss';

export const SideBarModal = (props) => {
  return (
    <div className='SideBarModal'> 
        <div className={`SideBarModalBackground ${props.showModal ? '' : 'hide'}`}>
          
          <div className='SideBarModalContainer'>
            <div className='SideBarModalTitle'>회원등록</div>
            <form action="#" mothod="POST">
              <input className='RegisterInput' type='text' placeholder='사용자의 아이디'></input>
              <input className='RegisterInput' type='password'></input>
              <input className='RegisterInput' type='password'></input>
              <input className='RegisterInput' type='text' placeholder='사용자의 실명'></input>
              <input className='RegisterInput' type='text' placeholder='사용자의 이메일'></input>
              
              <div className="RegisterHorizon"> 또는 </div>
              <input className="SubmitRegisterInfo" type='submit'></input>

              <div className="social-button google-connect"> Connect with Google</div>
            </form>
            
          </div>
        </div>
    </div>
  )
}

export default SideBarModal;