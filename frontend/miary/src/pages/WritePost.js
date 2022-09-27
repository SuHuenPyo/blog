/**
 * @author Shun
 * @email vytngms@gmail.com
 * @create date 2022-06-16 17:00:07
 * @modify date 2022-09-18 15:48:39
 * @desc [글 발행을 위한 페이지]
 */
import React, { useEffect } from 'react'
import WriteBox from '../components/WriteBox/WriteBox';

//redux;
import {useSelector, useDispatch} from "react-redux";
import {sessionCheck, setRt} from '../slices/SessionCheckSlice';

//페이지 이동
import { useNavigate } from 'react-router-dom';

export const WritePost = () => {

    //유효한 세션이 존재하는지 체크 (조작된 값은 체크 x)
    const {rt, rtmsg, item, loading} = useSelector((state)=> state.mySession);
    const dispatch = useDispatch();

    //세션이 없을경우 이동할 페이지 지정 
    const navi = useNavigate();

    useEffect(()=>{   
      dispatch(sessionCheck({})).unwrap();
    }, []);

    //slice 결과 체크 
    useEffect(()=>{
      console.log(rt);
      if(!rt) return;
      
      if(!loading){
        if(rt == 200){ // 성공
          dispatch(setRt(null));
          return;
        }else{
          dispatch(setRt(null));
          window.alert("로그인이 필요한 기능입니다.");
          navi(`/home`);
          
        }
      }
    }, [loading])



  return (
      <div className='WritePost'>
        <WriteBox/>
      </div>
      
  )
}
export default WritePost;

