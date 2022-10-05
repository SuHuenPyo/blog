import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import './MyBlogContent.scss';
import MyBlogTabView from './MyBlogTabView';
import MyBlogTop from './MyBlogTop';

import {getMyProfile, reset} from './../../slices/MyProfileSlice';
import { useNavigate } from 'react-router-dom';

export const MyBlogContent = () => {

  const navi = useNavigate();
  const {rt, rtmsg, item, loading} = useSelector((state)=> state.myMyProfile);
  const dispatch = useDispatch();

  useEffect(()=>{
    
    dispatch(getMyProfile({}));
    
    return () => dispatch(reset({}));
  },[])

  useEffect(()=>{

    if(rt == 401){
     window.alert('해당 기능은 로그인을 해주세요.');
     navi('/home');
    }else if(rt == 200){

    }

  },[rt])


  return (
    <div className='MyBlogContent'>

      {
        (rt == 200) ?
        <MyBlogTop Name={item?.name} Image={item?.image} userId={item?.userId} memberId={item?.memberId}/>
        :
        <MyBlogTop/>
      }
      
      {
        (rt == 200) ?
         <MyBlogTabView memberId={item?.memberId} />
        :
          <MyBlogTabView/>
      }

      
    
    </div>
  )
}

export default MyBlogContent;