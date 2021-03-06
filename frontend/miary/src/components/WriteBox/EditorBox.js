/**
 * @author Shun
 * @email vytngms@gmail.com
 * @create date 2022-06-16 18:06:39
 * @modify date 2022-07-08 16:41:44
 * @desc [React Markdown 라이브러리를 사용해서 사용자 입력값을 받음]
 */
import React, { useRef } from 'react'

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


  
 
// Initialize a markdown parser
const mdParser = new MarkdownIt(/* Markdown-it options */);

// Finish!
function handleEditorChange({ html, text }) {
  console.log('handleEditorChange', html, text);
}

export const EditorBox = () => {

  const editorRef = useRef();

  const handleClickButton = ()=>{
    const data = editorRef.current.getInstance().getHTML();
    console.log(data);
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
    />
    <input className="postButton" type='submit' value={'포스트 발행하기(현재 콘솔로그)'} onClick={handleClickButton}></input>

    {/* <Viewer initialValue={"## 뷰어 샘플 "}>

    </Viewer> */}

  </>
  )
}

export default EditorBox;
