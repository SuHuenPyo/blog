import React, { useState } from 'react'
import './ManagementTabUser.scss';

const ManagementTabUser = () => {

  const [ManageRDate, setManageRDate] = useState();       // 가입날짜 
  const [ManageId, setManageId] = useState();             // 아이디 
  const [ManageNickName, setManageNickName] = useState(); // 닉네임
  const [ManageMail, setManageMail] = useState();         // 이메일
  const [ManagePassword, setManagePassword] = useState(); // 패스워드
  const [ManageRePassword, setManageRePassword] = useState(); //패스워드 확인


  const handleId = e => setManageId(e.target.value);
  const handleNickName = e => setManageNickName(e.target.value);
  const handleMail = e => setManageMail(e.target.value);
  const handlePassword = e => setManagePassword(e.target.value);
  const handleRePassword = e => setManageRePassword(e.target.value);
  
  

  return (
    <div className='ManagementTabUser'>
      <div className='ManageUserBox'>
        <h1 className='ManageUserTitle'>
          가입일
        </h1>
        {ManageRDate || "로드중"}
      </div>
      <div className='ManageUserBox'>
        <div className='ManageUserTitleBox'>
          <h1 className='ManageUserTitle'>사용자 아이디</h1>
          <div className='ManageButton'>업데이트</div>
        </div>
        <div className='ManageNoticeArea'>사용자 아이디는 로그인시 사용됩니다.</div>
        <div className='ManageInputBox'>
          <input className='ManageInputText' type={'text'} value={ManageId} onChange={handleId}></input>
        </div>
        
      </div>

      <div className='ManageUserBox'>
        <div className='ManageUserTitleBox'>
          <h1 className='ManageUserTitle'>사용자 닉네임</h1>
          <div className='ManageButton'>업데이트</div>
        </div> 
        <div className='ManageNoticeArea'>사용자 닉네임은 댓글이나 컨텐츠영역에 표시되는 이름입니다.</div>
        <div className='ManageInputBox'>
          <input className='ManageInputText' type={'text'} value={ManageNickName} onChange={handleNickName}></input>
        </div>
        
      </div>

      <div className='ManageUserBox'>
        <div className='ManageUserTitleBox'>
          <h1 className='ManageUserTitle'>사용자 이메일</h1>
          <div className='ManageButton'>업데이트</div>
        </div>
        <div className='ManageNoticeArea'>사용자 이메일은 인증시에 사용되고 프로필카드에 나타납니다.</div>
        <div className='ManageInputBox'>
          <input className='ManageInputText' type={'text'} value={ManageMail} onChange={handleMail}></input>
        </div>
        
      </div>

      <div className='ManageUserBox'>
        <div className='ManageUserTitleBox'>
          <h1 className='ManageUserTitle'>비밀번호 변경</h1>
          <div className='ManageButton'>업데이트</div>
        </div>
        <div className='ManageNoticeArea'>비밀번호는 주기적으로 변경하는 것을 권장합니다.</div>
        <div className='ManageInputBox'>
          <input className='ManageInputText' type={'password'} value={ManagePassword} onChange={handlePassword}></input>
          <input className='ManageInputText' type={'password'} value={ManageRePassword} onChange={handleRePassword}></input>
        </div>
        
      </div>

    </div>
  )
}

export default ManagementTabUser