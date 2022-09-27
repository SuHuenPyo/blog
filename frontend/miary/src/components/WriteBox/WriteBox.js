/**
 * @author Shun
 * @email vytngms@gmail.com
 * @create date 2022-06-16 18:00:42
 * @modify date 2022-09-16 20:29:03
 * @desc [글을 쓰기위한 뷰, WritePost에서 호출당한다.]
 */

import React from 'react'
import EditorBox from './EditorBox';
import './WriteBox.scss';



export const WriteBox = () => {
  return (
    <div className='WriteBoxContainer'>
      <EditorBox/>
    </div>
  )
  
}

export default WriteBox;
