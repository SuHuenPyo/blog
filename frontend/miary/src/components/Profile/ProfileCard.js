/**
 * @author Shun
 * @email vytngms@gmail.com
 * @create date 2022-08-30 06:40:20
 * @modify date 2022-09-01 13:43:26
 * @desc [프로필 카드를 보여주는 컴포넌트]
 */
import React, { useEffect, useState } from 'react'
import { MiaryGetAxios, ServerUrl } from '../Common_function/MiaryAxios';
import './ProfileCard.scss';

//redux
import { getProfile } from "../../slices/profileSlice"
import { useDispatch, useSelector } from 'react-redux';
import defaultProfileImg from '../../assets/img/miary_img/defaultProfile.jpg'
import profileCardMarkImg from '../../assets/img/miary_img/Vertical.png'

//icon
import {
  FaMailBulk, // 돋보기
     
} from 'react-icons/fa';

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
    console.log("ProfileCard useEffect 시작");
    console.log("Profile Card - props.switch 값 : " + props.switch);
    if(props.switch == true){
      dispatch(getProfile({id:props.authorId}));
    }

    console.log(item);
  }, [props.switch]);

  useEffect(()=>{
    if(rt!=200){
      console.log("[ProfileCard] 사용자 정보 불러오는중..");
    }else{
      console.log("[ProfileCard] 사용자 정보 불러오기 완료");
    }
  },[rt]);

  return (
    <>
    
      {!loading && rt === 200 && (
        <div className='ProfileCard'>
          <div className='ProfileCardContainer'>
            
            
            <div className='ProfileCardImgContainer'>
              <div className='ProfileCardImgBox'>
                <img src={item.image || defaultProfileImg} onError={(e)=>{e.target.src = defaultProfileImg}}/>
              </div>
            </div>

            <div className='ProfileCardInfoContainer'>
              <div className='ProfileCardNameContainer'>
                <h1>{item.name+" 님"}</h1>
              </div>
              
              <div className='ProfileCardUserIdContainer'>
                <h1>{'@'+item.userId}</h1>
              </div>



              <div className='ProfileCardEmailContainer'>
                <h1><FaMailBulk/>{" "+item.email}</h1>
              </div>
              
              <div className='ProfileCardIntroContainer'>
                <h1>{item.intro || `${item.name}님의 자기소개가 없습니다.`}</h1>
              </div>
            </div>
            <div className="Ribbon">
              <img src={profileCardMarkImg}/>
            </div>
          </div>
        
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