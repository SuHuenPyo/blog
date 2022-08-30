import React, { useEffect, useState } from 'react'
import { useLocation } from 'react-router-dom';
import {BannerTitle} from '../components/Content/BannerTitle';
import './ContentDetail.scss';



import '@toast-ui/editor/dist/toastui-editor-viewer.css';
import { Viewer } from '@toast-ui/react-editor';
import { ProfileCard } from '../components/Profile/ProfileCard';
import { ContentDetails } from '../components/Content/ContentDetails';
import TagList from '../components/Tag/TagList';
import GetContentList from '../components/Content/GetContentList';
import ContentComment from '../components/Comment/ContentComment';
import {MiaryGetAxios, MiaryPostAxios, ServerUrl} from '../components/Common_function/MiaryAxios';

//redux
import { getProfile } from '../slices/profileSlice';
import { useDispatch, useSelector } from 'react-redux';
import { getContentDetail } from '../slices/ContentDetailSlice';


export const ContentDetail = () => {

  //랜더링전에 useEffect를 먼저호출하기 위한 꼼수 loading 
  const {rt, item, loading} = useSelector((state) => state.myContentDetail);
  const dispatch = useDispatch();


  //useRef는 리렌더링 하지않는다. 컴포넌트의 속성만 조회 & 수정한다. 


  const location = useLocation();
  const contentId = location.state.data.contentId;

  //프로필 카드 로딩 지연을 위한 
  const [profileCardSwitch, setProfileCardSwitch] = useState(false);



  useEffect(()=>{

    if(!loading) dispatch(getContentDetail({id:contentId}));
    
    if(rt!=200){
      return alert(`[getContentDetail] error`);
    }

    setProfileCardSwitch(true);
    // let result=null;
    // (async()=>{
    //   result = await MiaryGetAxios(ServerUrl+"post/detail", "상세 글 가져오기 성공", "상세 글 가져오기 실패", {id:contentId});
    //   setContentDetail(result);
    //   console.log(2);
    // })(); 

  }, []);



  return (
    <>

      
      {!loading && rt === 200 && (
        <div className='ContentDetail'>
          <BannerTitle title={item.title} banner={item.banner}></BannerTitle>
          <Viewer initialValue={item.content}  />
          <ProfileCard authorId={item.author} switch={profileCardSwitch} ></ProfileCard>
          

          {/* <br></br>
          여기에 세미 타이틀 한개 넣을지 곰민중 ...
          <br/>

          <ContentDetails></ContentDetails>
          <br/>
          <TagList/>
          <br/>
          <GetContentList/>
          <br/>
          <ContentComment/>
          <br/>
          만약 모바일~테블릿 사이즈는 좋아요와 댓글을 하단에 고정때리기
          but 태블릿~ 사이즈는 왼쪽에 고정때리기   */}
      
      </div>
      )}
      
    </>
  )

}

export default ContentDetail;