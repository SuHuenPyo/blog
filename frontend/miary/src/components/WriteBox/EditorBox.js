/**
 * @author Shun
 * @email vytngms@gmail.com
 * @create date 2022-06-16 18:06:39
 * @modify date 2022-08-18 22:48:47
 * @desc [React Markdown 라이브러리를 사용해서 사용자 입력값을 받음]
 */
import React, { useRef } from 'react'
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
import { MiaryPostAxios } from '../Common_function/MiaryAxios';


  
 
// Initialize a markdown parser
const mdParser = new MarkdownIt(/* Markdown-it options */);

// Finish!
function handleEditorChange({ html, text }) {
  console.log('handleEditorChange', html, text);
}

export const EditorBox = () => {

  const editorRef = useRef();

  const handleClickButton = async()=>{
    if(window.confirm("글을 발행합니까?")){
      let data = editorRef.current.getInstance().getHTML();
      console.log(data);
      
      let bodyFormData = new FormData();
      bodyFormData.append('title', "타이틀 들어갈 내용");
      bodyFormData.append('content', data);
      bodyFormData.append('author', 3); // 추후에 세션값에서 m_id를 추출해서 자동으로 들어가게 해줄 예정
      //bodyFormData.append('banner', "배너 url"); 추가해야합니다.

      let response = null ; 
      try{
        response = await MiaryPostAxios("http://localhost:3300/post", bodyFormData);
        
        //console.log("response : " + JSON.stringify(response, null, 2)); //stringify (,replace, 문자열간격);
      }catch{
        console.error(response) // handle error
      }

      if(response.status == 201){
        //1. 성공되었단 메시지 .
        window.alert("글이 성공적으로 발행되었습니다.");

        //2. 홈 화면으로 리다이렉션 해주거나 &  자기가 쓴 글로 이동시켜 주거나 
      }else{
        window.alert("시스템 에러가 발생했습니다. 관리자에게 문의해주세요.");
      }
      
    }
    
  }
  return (

    <>

    <Editor
      previewStyle="vertical"
      height="600px"
      initialEditType="markdown"
      initialValue="여기에 글을 써주세요. 모바일 또는 마크다운이 아닌 글로 발행하려면 위지윅 탭을 눌러주세요"
      language='ko-KR'
      ref={editorRef}

      hooks={
        {
          addImageBlobHook: async(blob, callback) =>{
            console.log(blob);
            //1. 이미지 서버로 전송, url 리턴받기 

            let bodyFormData = new FormData();
            bodyFormData.append('imgs',blob);

            let response = await MiaryPostAxios("http://localhost:3300/images", bodyFormData);
            console.log(response.data);

            //2. callback으로 이미지 화면에 넣기
            callback(response.data, "이미지");
          }
        }
      }
    />
    <input className="postButton" type='submit' value={'포스트 발행하기(현재 콘솔로그)'} onClick={handleClickButton}></input>

    {/* <Viewer initialValue={"## 뷰어 샘플 "}>

    </Viewer> */}

  </>
  )
}

export default EditorBox;
