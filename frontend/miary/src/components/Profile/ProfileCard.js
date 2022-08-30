/**
 * @author Shun
 * @email vytngms@gmail.com
 * @create date 2022-08-30 06:40:20
 * @modify date 2022-08-30 15:16:44
 * @desc [프로필 카드를 보여주는 컴포넌트]
 */
import React, { useEffect, useState } from 'react'
import { MiaryGetAxios, ServerUrl } from '../Common_function/MiaryAxios';
import './ProfileCard.scss';

//redux
import { getProfile } from "../../slices/profileSlice"
import { useDispatch, useSelector } from 'react-redux';


/**
 * backend userId,name,email,intro,image FROM members WHERE m_id
 */


export const ProfileCard = (props) => {
  //const [AuthorId, setAuthorId] = useState(props.authorId);
  const [UserInfo, setUserInfo] = useState([]);

  const {rt , item, loading} = useSelector((state) => state.profile);
  const dispatch = useDispatch();

  // useEffect(()=>{
  //   let result = null;
    
  //   (async()=>{
  
  //     result = await MiaryGetAxios(ServerUrl+"profile/id", "유저정보 가져오기 성공", "유저정보 가져오기 실패", {id: props.authorId});
  //     setUserInfo(result);
  //   })();
    
  // },[props]);

  useEffect(()=>{
    console.log("Profile Card - props.switch 값 : " + props.switch);
    if(props.switch == true){
      dispatch(getProfile({id:props.authorId}));
    }
    if(rt!=200){
      return alert(`[getProfile] error`);
    }
  }, []);

  return (
    <>
    
      {!loading && rt === 200 && (
        <div>
          {item.name}
          </div>
      )}
    </>
  )
}
ProfileCard.defaultProps={
  authorId: null,
  switch: false,
}

export default ProfileCard