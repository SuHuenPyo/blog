/**
 * @author Shun
 * @email vytngms@gmail.com
 * @create date 2022-09-25 12:18:39
 * @modify date 2022-10-05 12:51:06
 * @desc [사용자 관리, 설정을 위한 manageMent 컴포넌트]
 */

import React, { useEffect, useRef, useState } from 'react';
import ManagementTabAnalysis from './ManagementTabAnalysis';
import ManagementTabPost from './ManagementTabPost';
import ManagementTabUser from './ManagementTabUser';
import ManagementTabProfile from './ManagementTabProfile';
import './ManagementWrap.scss';
import { useDispatch, useSelector } from 'react-redux';

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
    const [saveEventTarget , setSaveEventTarget] = useState(); //e.target

    const changeTapMenu = (e,component)=>{
        console.log('실행')
        console.log(saveEventTarget);
        
        if(saveEventTarget){
            saveEventTarget.classList.remove("ManagementTabContentClicked");
        }
        e.target.classList.add('ManagementTabContentClicked');
        setSelectedTap(component);
        setSaveEventTarget(e.target);
    }

    //맨처음만 실행 get user info   대충 dispatch 학소 이름 이미지 유저아이디 이메일 맴버아이디  가져와서 넣어주는 내용 
    useEffect(()=>{
        

        //sessionStorage.getItem();
        if(!saveEventTarget){
            refUserFirst.current.classList.add('ManagementTabContentClicked')
            setSelectedTap(manageTap.USER);
            setSaveEventTarget(refUserFirst.current)
        }

    },[])

    const refUserFirst = useRef(); //맨처음 요소를 포커싱해주기 위한 ref 

    

  return (
    <div className='ManagementWrap'>
        <div className='ManagementContainer'> {/* flex */}
            
            <div className='ManagementGroupBox'> {/* flex %*/}

                <div className='ManagementGroupContainer'>

                <div className='ManagementGroupTabName' >
                    <p className='ManagementTabIcon' ><FaUser/></p><p className='ManagementTabName'>사용자 관리</p>
                </div>
                <div className='ManagementTabDetailBox'>
                        <h1 className='ManagementTabDetailContent' ref={refUserFirst} onClick={ (e)=> {changeTapMenu(e,manageTap.USER);}}>계정</h1>
                        <h1 className='ManagementTabDetailContent'  onClick={(e)=>{changeTapMenu(e,manageTap.PROFILE);}}>프로필</h1>
                </div>
                <hr/>

                <div className='ManagementGroupTabName' >
                    <p className='ManagementTabIcon'><FaPen/></p><p className='ManagementTabName'>포스트 관리</p>
                </div>
                <div className='ManagementTabDetailBox'>
                        <h1 className='ManagementTabDetailContent'  onClick={(e)=>{changeTapMenu(e, manageTap.POST);}}>포스트</h1>
                </div>
                <hr/>

                <div className='ManagementGroupTabName' >
                    <p className='ManagementTabIcon'><FaChartBar/></p><p className='ManagementTabName'>분석</p>
                </div>
                <div className='ManagementTabDetailBox'>
                    <h1 className='ManagementTabDetailContent' onClick={(e)=>{changeTapMenu(e, manageTap.ANALY); }}>조회수</h1>
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