import React from 'react'
import { useLocation } from 'react-router-dom';
import {BannerTitle} from '../components/Content/BannerTitle';

import '@toast-ui/editor/dist/toastui-editor-viewer.css';
import { Viewer } from '@toast-ui/react-editor';
import { ProfileCard } from '../components/Profile/ProfileCard';
import { ContentDetails } from '../components/Content/ContentDetails';
import TagList from '../components/Tag/TagList';
import GetContentList from '../components/Content/GetContentList';
import ContentComment from '../components/Comment/ContentComment';


export const ContentDetail = () => {

  const location = useLocation();

  const data = location.state.data;
  
  const contentId = data.contentId;
  const content = data.content;

  const title = 0;
  const banner = 0;



  return (
    <div className='ContentDetail'>

      <BannerTitle title={title} banner={banner}></BannerTitle>

      <Viewer initialValue={content} />


      <ProfileCard>프로필카드 (나중에 프로필설정란에서도 해당컴포넌트는 재사용하자 )</ProfileCard>
      
      <ContentDetails></ContentDetails>
      <br/>
      <TagList/>
      <br/>
      <GetContentList/>
      <br/>
      <ContentComment/>
      <br/>
      만약 모바일~테블릿 사이즈는 좋아요와 댓글을 하단에 고정때리기
      but 태블릿~ 사이즈는 왼쪽에 고정때리기  

      
      
    </div>
  )

}

export default ContentDetail;