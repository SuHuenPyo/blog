/**
 * @author Shun
 * @email vytngms@gmail.com
 * @create date 2022-09-27 01:16:56
 * @modify date 2022-09-27 02:12:26
 * @desc [내정보 수정에서 포스트에 해당되는 컴포넌트]
 */
import React from 'react'
import './ManagementTabPost.scss';

const ManagementTabPost = () => {
  return (
    <div className='ManagementTabPost'>
      
      <div className='ManageUserBox'>
        <div className='ManageUserTitleBox'>
            <h1 className='ManageUserTitle'>내가 작성한 글</h1>
        </div>
        <div className='ManageInputBox'>
          <div className='ManagePostBoxFlex'>
            <div className='ManagePostBox'>내가작성한글1</div>
            <div className='ManagePostBox'>내가작성한글2</div>
            <div className='ManagePostBox'>내가작성한글3</div>
            <div className='ManagePostBox'>내가작성한글4</div>
            <div className='ManagePostBox'>내가작성한글5</div>
          </div>
          
        </div>
      </div>


    </div>
  )
}

export default ManagementTabPost