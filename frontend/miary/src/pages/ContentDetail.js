import React, { useEffect, useRef, useState } from 'react'
import { useLocation, useParams } from 'react-router-dom';
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


//icon
import {
  FaHeart,
  FaComment,
  FaArrowUp

     
} from 'react-icons/fa';

export const ContentDetail = () => {




  //useRef는 리렌더링 하지않는다. 컴포넌트의 속성만 조회 & 수정한다. 


  // const location = useLocation();
  // const contentId = location.state.data.contentId;
  const {contentId} = useParams();

  //프로필 카드 로딩 지연을 위한 
  const [profileCardSwitch, setProfileCardSwitch] = useState(false);


    //랜더링전에 useEffect를 먼저호출하기 위한 꼼수 loading 
  const {rt, item, loading} = useSelector((state) => state.myContentDetail);
  const dispatch = useDispatch();

  useEffect(()=>{
    console.log("ContentDetail dispatch 시작");
    if(!loading) {
      dispatch(getContentDetail({id:contentId}));
    }

  }, [contentId]);

  useEffect(()=>{
    if(rt!=200){
      console.log("[ContentDetail] 컨텐츠 정보 불러오는중..")
      
    }else{
      setProfileCardSwitch(true);
      console.log("[ContentDetail] 컨텐츠 정보 불러오기 완료");
    }

  }, [rt])

  //따라다니는 배너

  return (
    <>

      
      {!loading && rt === 200 && (
        <div className='ContentDetail'>


          <BannerTitle title={item.title} banner={item.banner}></BannerTitle>
          <div className='ContentDetailContainer'>
            <ProfileCard authorId={item.author} switch={profileCardSwitch} ></ProfileCard>

            <div className='viewerContainer'>


                <div className='followingMenuBox'>
                   <div className='followingMenu'> 
                    <div className='followingMenuLikeBtn'><FaHeart/></div>
                    <div className='followingMenuCommentBtn'><FaComment/></div>
                    <div className='followingMenuTopBtn'><FaArrowUp/></div>
                </div>
              </div>

              <div className='detailViewerContainer'>
                <Viewer initialValue={item.content} className='ContentDetailViewer'  />
              </div>

            </div>
            
      
          </div>
          <div className='detailViewerComment'>
              <ContentComment/>
              <ContentComment/>
              <ContentComment/>
              <ContentComment/>
              <ContentComment/>
              <ContentComment/>
              <ContentComment/>
              <ContentComment/>
              
              
          </div>
          
          
 
          
          

          {/* <br></br>
          여기에 세미 타이틀 한개 넣을지 곰민중 ...
          <TagList/>
          <br/>
          <GetContentList/>
          <br/>

          <br/>
          만약 모바일~테블릿 사이즈는 좋아요와 댓글을 하단에 고정때리기
          but 태블릿~ 사이즈는 왼쪽에 고정때리기   */}
      

          


        </div>
      )}
      
    </>
  )

}

export default ContentDetail;