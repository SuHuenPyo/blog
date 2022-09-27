/**
 * @author Shun
 * @email vytngms@gmail.com
 * @create date 2022-06-16 18:06:39
 * @modify date 2022-09-27 17:31:15
 * @desc [React Markdown 라이브러리를 사용해서 사용자 입력값을 받음]
 */
import React, { Children, useCallback, useRef, useState } from 'react'
import axios from 'axios';


import MarkdownIt from 'markdown-it';
import MdEditor from 'react-markdown-editor-lite';
// import style manually
import 'react-markdown-editor-lite/lib/index.css';

//toast ui editor
import '@toast-ui/editor/dist/toastui-editor.css';
import {Editor} from '@toast-ui/react-editor';
import '@toast-ui/editor/dist/i18n/ko-kr'; 

//toast ui viewer
import '@toast-ui/editor/dist/toastui-editor-viewer.css';
import { Viewer } from '@toast-ui/react-editor';

//common functions
import { MiaryPostAxios, ServerUrl } from '../Common_function/MiaryAxios';
import { Link } from 'react-router-dom';

//스타일 시트 editorBox.js
import "./EditorBox.scss";

 
// Initialize a markdown parser
const mdParser = new MarkdownIt(/* Markdown-it options */);

// Finish!
function handleEditorChange({ html, text }) {
  console.log('handleEditorChange', html, text);
  
}

export const EditorBox = () => {

  const editorRef = useRef();

  const [TitleName, setTitleName] = useState(null);
  const [BannerImg, setBannerImg] = useState(null);
  const [BannerName, setBannerName] = useState(null);
  const [HashTag, setHashTag] = useState('');
  const [HashArr, setHashArr] = useState([]);//HashTag에 저장된 값을 배열로 차곡차곡 넣어줄예정 

  const recordTitleName = (e) => {
    e.preventDefault();
    setTitleName(e.target.value);

  }

  const handleClickButton = async()=>{
    if(window.confirm("글을 발행합니까?")){
      let data = editorRef.current.getInstance().getHTML();
      let markdown = editorRef.current.getInstance().getMarkdown();
      
      let bodyFormData = new FormData();
      bodyFormData.append('title', TitleName);
      bodyFormData.append('content', data);
      bodyFormData.append('author', 3); // 추후에 세션값에서 m_id를 추출해서 자동으로 들어가게 해줄 예정
      bodyFormData.append('markdown', markdown);
      bodyFormData.append('tags', JSON.stringify(HashArr));
      bodyFormData.append('banner', BannerImg || null); 

      let response = null ; 
      try{
        response = await MiaryPostAxios("https://miary.duckdns.org/api/post", bodyFormData, true);
        
        //console.log("response : " + JSON.stringify(response, null, 2)); //stringify (,replace, 문자열간격);
      }catch{
        console.error(response) // handle error
      }

      if(response.status == 201){
        //1. 성공되었단 메시지 .
        window.alert("글이 성공적으로 발행되었습니다.");
        window.location.href = `/contentDetail/${response.data?.boardId}`;
        
        //2. 홈 화면으로 리다이렉션 해주거나 &  자기가 쓴 글로 이동시켜 주거나 
      }else{
        window.alert("시스템 에러가 발생했습니다. 관리자에게 문의해주세요.");
      }
      
    }
    
  }

  const refBannerImg = useRef(null);
  const refTitleInput = useRef(null);

  /**
   * 
   * @param {React.ChangeEvent<HTMLInputElement>} e 
   */
  const uploadBanner = async(e)=>{

    //let bodyFormData = new FormData();
    //bodyFormData.append('imgs',e.target.files[0]);
    setBannerImg(e.target.files[0]);
    setBannerName(e.target.files[0].name);
    // console.log(e.target.files);

    // let response = await MiaryPostAxios("http://localhost:3300/images", bodyFormData);
    // console.log(response.data);
    // if(response.data){
    //   setBannerImg(response.data[0]); // banner full url
    //   let arrImgNumber = response.data[0].split('/') //유저에게 보일 url
    //   setBannerName(arrImgNumber[3]);
    // }

  }
  const handleClickBannerInput = () => refBannerImg.current?.click();


  /**
   * 타이틀 값이 빈값이면 색상을 달리한다. Focus out을기준으로 실행함
   * @param {React.ChangeEvent<HTMLInputElement>} e 
   */
  const checkTitleNullValue = (e) =>{
    e.preventDefault();
    refTitleInput.current.style = e.target.value ? `border-left: 15px solid #4747476c;` : ``; 
    
  }

  /**
   * input태그에 글이 입력될때마다 글을 스테이트에 저장함
   * @param {React.ChangeEvent<HTMLInputElement>} e 
   */
  const onChangeHashTag = (e) =>{
    e.preventDefault();
    setHashTag(e.target.value);
  }
  
  const onKeyUp = useCallback(
    /**
    * 엔터시 태그 생성과, 클릭시 삭제등록
    * @param {React.ChangeEvent<HTMLInputElement>} e 
    */
    (e)=>{
        e.preventDefault();
        const $HashTagOuter = document.querySelector('.HashTagOuter');
        const $HashTagInner = document.createElement('div');
        $HashTagInner.className = 'HashTagInner';

        //console.log("필터 : "+HashArr.filter((idx) => idx != $HashTagInner.innerHTML));
        
        //태그 클릭 이벤트 삭제
        $HashTagInner.addEventListener('click', ()=>{
          $HashTagOuter?.removeChild($HashTagInner)
          //console.log($HashTagInner.innerHTML + "삭제됨");
          setHashArr((HashArr) => HashArr.filter((idx) => idx != $HashTagInner.innerHTML.replace("#", "")));
          //console.log("삭제되고 남은 HashArr : " + HashArr);
        })

        //엔터 감지시 태그 등록
        if(e.keyCode === 13 && e.target.value?.trim() !== ''){
          
          if(HashArr.length > 4){
            window.alert('최대 해시태그 갯수는 5개입니다.');
            return;
          }
          if(HashTag.length > 20){
            window.alert("최대 해시태그 길이는 20자입니다.");
            return;
          }

          $HashTagInner.innerHTML = '#'+ e.target.value.trim();
          $HashTagOuter?.insertBefore($HashTagInner, $HashTagOuter.lastChild);
          setHashArr((HashArr) => [...HashArr, HashTag]);
          setHashTag('');

          //태그마다 랜덤컬러 부여
          let rand_0_255 = [255, 255, 2];
          for (let i = 0 ; i < 3; i++) {
            rand_0_255[i] = Math.floor(Math.random() * /*256*/ 200);
          }
          //흑백으로 
          // let temp = Math.floor(Math.random() * 200);
          // for(let i=0; i< 3; i++) rand_0_255[i]=temp;
          
          $HashTagOuter.children.item($HashTagOuter.children.length-2).style.backgroundColor = 'rgba(' + [...rand_0_255].join(',') + ', 0.5)';
          
          
        }

    }, [HashTag, HashArr]);
  return (
    <div className='EditorBox'>
      <div className='EditorTitleContainer'>
        
        <div className='titlePostIt' ref={refTitleInput}>
          <input className='titlePostitInput'  type="text" name="titleText" placeholder='제목을 입력해주세요 ..' value={TitleName} onChange={recordTitleName} onBlur={checkTitleNullValue}></input>
        </div>
        
        <div className='BannerArea'>
          <input className='BannerAreaInputImg' ref={refBannerImg} type="file" accept='image/*' onChange={uploadBanner}/>
          <input className='BannerAreaInputBtn' type="button" onClick={handleClickBannerInput} value={'배너 업로드'}/>
          <h2 className='BannerAreaImgName'>{BannerName || "아직 배너가 등록되지 않았습니다. (선택)"}</h2>
        </div>

        <div className='TagArea'>
          <div className='HashTagOuter'>
            <input
              className='HashTagInput'
              type={'text'}
              value={HashTag}
              onChange={onChangeHashTag}
              onKeyUp={onKeyUp}
              placeholder="태그를 입력하세요"
            />
          </div>
          
        </div>
      </div>
      {/** 
       * 배너 사진 
       * 타이틀 이름
       * 
       */ }
      <div className='EditorArea'>
        <Editor
          previewStyle="tab"
          height="600px"
          initialEditType="markdown"
          initialValue="마크 다운으로 글을 작성하고 미리 보기로 확인해주세요 모바일 또는 마크 다운이 아닌 글로 발행하려면 하단 위지윅 탭을 눌러주세요"
          language='ko-KR'
          ref={editorRef}

          hooks={
            {
              addImageBlobHook: async(blob, callback) =>{
                console.log(blob);
                //1. 이미지 서버로 전송, url 리턴받기 

                
                let bodyFormData = new FormData();
                bodyFormData.append('imgs',blob);

                let response = await MiaryPostAxios(ServerUrl+'images/', bodyFormData);
                console.log(response.data);

                //2. callback으로 이미지 화면에 넣기
                callback(response.data, "이미지");
              }
            }
          }
        />
        <input className="postButton" type='submit' value={'포스트 발행하기(현재 콘솔로그)'} onClick={handleClickButton}></input>
      </div>
      

      {/* <Viewer initialValue={"## 뷰어 샘플 "}>

      </Viewer> */}

  </div>
  )
}

export default EditorBox;
