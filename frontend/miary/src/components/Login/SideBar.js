import React from 'react'
import {useState} from 'react';
import SideBarModal from './SideBarModal';
import './SideBar.scss';
export const SideBar = () => {

  const [showModal, setShowModal] = useState(false);

  const openModal = () => {
    setShowModal(true);
  }

  return (
    <div className='SideBar'>
      <button onClick={openModal}>임시로그인</button>
      <SideBarModal showModal={showModal} /*closeModal={closeModal}*/></SideBarModal>

    </div>
  )
}

export default SideBar;
