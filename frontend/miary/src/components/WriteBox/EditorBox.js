/**
 * @author Shun
 * @email vytngms@gmail.com
 * @create date 2022-06-16 18:06:39
 * @modify date 2022-07-08 15:15:04
 * @desc [React Markdown 라이브러리를 사용해서 사용자 입력값을 받음]
 */
import React from 'react'

import MarkdownIt from 'markdown-it';
import MdEditor from 'react-markdown-editor-lite';
// import style manually
import 'react-markdown-editor-lite/lib/index.css';

//toast ui editor
import '@toast-ui/editor/dist/toastui-editor.css';
import {Editor} from '@toast-ui/react-editor';

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
  const handleClickButton = ()=>{
    console.log("Focus!!");
  }
  return (

    // <MdEditor style={{ height: '500px' }} renderHTML={text => mdParser.render(text)} onChange={handleEditorChange} />
    <>
    <Editor
      previewStyle="vertical"
      height="400px"
      initialEditType="markdown"
      initialValue="hello"
    />
    <button onClick={handleClickButton}>Click!</button>
    <Viewer initialValue={"## 뷰어 샘플 "}>

    </Viewer>

  </>
  )
}

export default EditorBox;
