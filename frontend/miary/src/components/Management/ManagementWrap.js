/**
 * @author Shun
 * @email vytngms@gmail.com
 * @create date 2022-09-25 12:18:39
 * @modify date 2022-09-27 00:18:09
 * @desc [사용자 관리, 설정을 위한 manageMent 컴포넌트]
 */

import React, { useState } from 'react';
import ManagementTabAnalysis from './ManagementTabAnalysis';
import ManagementTabPost from './ManagementTabPost';
import ManagementTabUser from './ManagementTabUser';
import ManagementTabProfile from './ManagementTabProfile';
import './ManagementWrap.scss';

import {
    FaUser,
    FaPen,
    FaChartBar
}from 'react-icons/fa'


const ManagementWrap = () => {

    const manageTap = {
        USER : <ManagementTabUser/>,
        PROFILE: <ManagementTabProfile/>,
        POST : <ManagementTabPost/>,
        ANALY: <ManagementTabAnalysis/>
    }

    const [selectedTap, setSelectedTap] = useState(manageTap.USER);

    const changeTapMenu = (component)=>{
        console.log('aaaaa')
        setSelectedTap(component);
    }

  return (
    <div className='ManagementWrap'>
        <div className='ManagementContainer'> {/* flex */}
            
            <div className='ManagementGroupBox'> {/* flex %*/}

                <div className='ManagementGroupContainer'>

                <div className='ManagementGroupTabName' >
                    <p className='ManagementTabIcon'><FaUser/></p><p className='ManagementTabName'>사용자 관리</p>
                </div>
                <div className='ManagementTabDetailBox'>
                        <h1 className='ManagementTabDetailContent' onClick={()=>{changeTapMenu(manageTap.USER)}}>계정</h1>
                        <h1 className='ManagementTabDetailContent' onClick={()=>{changeTapMenu(manageTap.PROFILE)}}>프로필</h1>
                </div>
                <hr/>

                <div className='ManagementGroupTabName' >
                    <p className='ManagementTabIcon'><FaPen/></p><p className='ManagementTabName'>포스트 관리</p>
                </div>
                <div className='ManagementTabDetailBox'>
                        <h1 className='ManagementTabDetailContent'onClick={()=>{changeTapMenu(manageTap.POST)}}>포스트</h1>
                </div>
                <hr/>

                <div className='ManagementGroupTabName' >
                    <p className='ManagementTabIcon'><FaChartBar/></p><p className='ManagementTabName'>분석</p>
                </div>
                <div className='ManagementTabDetailBox'>
                    <h1 className='ManagementTabDetailContent' onClick={()=>{changeTapMenu(manageTap.ANALY)}}>조회수</h1>
                </div>

                </div>

                

                

            </div>
            {/* 여기는 컨텐트 영역 */}{/* flex %*/}

            <div className='ManagementContentBoxContainer'>
                <div className='ManagementContentBox'>
                    {selectedTap}
                </div>
            </div>
            
            
        </div>
        
        
    </div>
  )
}


export default ManagementWrap