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
import useMoveScroll from '../components/Common_function/Miary_useMoveScroll';

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
import CommentWrap from '../components/Comment/CommentWrap';


export const ContentDetail = () => {




  //useRef는 리렌더링 하지않는다. 컴포넌트의 속성만 조회 & 수정한다. 


  // const location = useLocation();
  // const contentId = location.state.data.contentId;
  const {contentId} = useParams();

  // 로딩 지연을 위한 
  const [ProfileCardSwitch, setProfileCardSwitch] = useState(false);
  const [CommentSwitch, setCommentSwitch] = useState(false);


    //랜더링전에 useEffect를 먼저호출하기 위한 꼼수 loading 
  const {rt, item, loading} = useSelector((state) => state.myContentDetail);
  const dispatch = useDispatch();

  useEffect(()=>{
    
    if(!loading) {
    
      dispatch(getContentDetail({id:contentId}));
    }

  }, [contentId]);

  useEffect(()=>{
    if(rt!=200){
      
      
    }else{
      setProfileCardSwitch(true);
      setCommentSwitch(true);
      console.log("[ContentDetail] 컨텐츠 정보 불러오기 완료");
    }

  }, [rt])


  //좌측 제어패널 
  const followingControllMenu = {
    Like : (data) => { 
      console.log(data);
    },
    Comment : (data) => {
      console.log(data);
    },
    moveToTop: (data=null)=>{
      window.scrollTo({
        top: 0,
        behavior: "smooth"
      })
    },
    length: 3,

  }

  //댓글창 이동을 위한 Ref
  const commentRef = useRef(null);
  const onCommentClick = () => {
    commentRef.current?.scrollIntoView({behavior: 'smooth'});
  };


  //좌측패널 컨트롤러
  const followingMenuController = (cb,number)=> cb(number);
  

  //MoveToTop
  

  return (
    <>

      
      {!loading && rt === 200 && (
        <div className='ContentDetail'>


          <BannerTitle title={item.title} banner={item.banner}></BannerTitle>
          <div className='ContentDetailContainer'>
            <ProfileCard authorId={item.author_id} switch={ProfileCardSwitch} ></ProfileCard>

            <div className='viewerContainer'>


                <div className='followingMenuBox'>
                   <div className='followingMenu'> 
                    <div className='followingMenuLikeBtn'><FaHeart className='svgBtn'/><h1>{null ||"N/A"}</h1></div>
                    <div className='followingMenuCommentBtn' onClick={onCommentClick}><FaComment className='svgBtn'/><h1>{null ||"N/A"}</h1></div>
                    <div className='followingMenuTopBtn' onClick={()=>{followingMenuController(followingControllMenu.moveToTop, null)}}><FaArrowUp className='svgBtn'/><h1>Top</h1></div>
                </div>
              </div>

              <div className='detailViewerContainer'>
                <Viewer initialValue={item.content} className='ContentDetailViewer'  />
              </div>

            </div>
            
      
          </div>
          <div className='detailViewerComment'  ref={commentRef}>
            
            <CommentWrap boardId ={contentId} switch={CommentSwitch}/>

              
              
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