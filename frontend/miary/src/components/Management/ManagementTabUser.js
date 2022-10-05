import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { getMyInfo, reset } from '../../slices/ManageUserSlice';
import Loading from '../Common_function/Loading';
import { MiaryPutAxios, ServerUrl } from '../Common_function/MiaryAxios';
import './ManagementTabUser.scss';

//props - reloadController(reRendering dispatch)
const ManagementTabUser = () => {

  const [ManageRDate, setManageRDate] = useState();       // 가입날짜 
  const [ManageId, setManageId] = useState();             // 아이디 
  const [ManageNickName, setManageNickName] = useState(); // 닉네임
  const [ManageMail, setManageMail] = useState();         // 이메일
  const [ManagePassword, setManagePassword] = useState(); // 패스워드
  const [ManageRePassword, setManageRePassword] = useState(); //패스워드 확인
  const [ManageMemberId, setManageMemberId] = useState(); //맴버 아이디

  const [originUserId, setOriginUserId] = useState(); // 유저의 원래 로그인 아이디

  const [bLoading, setBLoading] = useState(false); // 로딩 여부  true시 로딩중

  const {rt, rtmsg, item, loading} = useSelector((state)=> state.myUserInfo);
  const dispatch = useDispatch();

  

  const handleId = e => setManageId(e.target.value);
  const handleNickName = e => setManageNickName(e.target.value);
  const handleMail = e => setManageMail(e.target.value);
  const handlePassword = e => setManagePassword(e.target.value);
  const handleRePassword = e => setManageRePassword(e.target.value);


  
  
  //유저 아이디 변경
  const changeUserId = async()=>{
    setBLoading(true);
    let response = await MiaryPutAxios(ServerUrl+'user/id',  {
      userLoginId: originUserId,
      newUserId : ManageId,
      memberId: ManageMemberId,
    });
    if(response.data){
      window.alert("아이디가 업데이트 되었습니다.");
    }else{
      window.alert(response.response.data);
    }
    setBLoading(false);
  }
  //유저 닉네임 변경
  const changeUserNickname =async () =>{
    setBLoading(true);
    let response = await MiaryPutAxios(ServerUrl+'user/nickname',  {
      userLoginId: originUserId,
      newName : ManageNickName,
      memberId: ManageMemberId,
    });
    if(response.data){
      window.alert("닉네임이 업데이트 되었습니다.");
    }else{
      window.alert(response.response.data);
    }
    setBLoading(false);
  }

  //유저 이메일 변경
  const changeUserEmail = async() => {
    setBLoading(true);
    let response = await MiaryPutAxios(ServerUrl+'user/email',  {
      userLoginId: originUserId,
      newEmail : ManageMail,
      memberId: ManageMemberId,
    });
    if(response.data){
      window.alert("이메일이 업데이트 되었습니다.");
    }else{
      window.alert(response.response.data);
    }
    setBLoading(false);
  }

  //유저 패스워드 변경
  const changeUserPassword = async() => {
    if(ManagePassword != ManageRePassword){
      window.alert("비밀번호와 비밀번호 확인란이 서로 다릅니다.");
    }
    setBLoading(true);
    let response = await MiaryPutAxios(ServerUrl+'user/password',  {
      userLoginId: originUserId,
      newPassword : ManagePassword,
      memberId: ManageMemberId,
    });
    if(response.data){
      window.alert("비밀번호가 업데이트 되었습니다.");
    }else{
      window.alert(response.response.data);
    }
    setBLoading(false);
  }


  //수정했다고 해서 reload 하지는 않는다. 다만 탭을 바꿀때 reload 할것이니 컴포넌트가 unmount되면 redux 상태값을 초기화 해준다.
  useEffect(()=>{

    console.log("ManagementTabUser 처음 UseEffect 실행!");
    if(rt == null) dispatch(getMyInfo({}));

    return () => {
      //dispatch(reset({}));
      console.log("ManagementTabUser 언마운트 useEffect 실행!");
    }
  },[]);

  useEffect(()=>{
    //name, image, userId, email ,memberId, rdate, intro 
    console.log("ManagementTabUser redux item값 변경되어서 UseEffect 실행 Item값 : " + JSON.stringify(item) );

    if(item){
      setManageRDate(item?.rdate);
      setManageId(item?.userId);
      setOriginUserId(item?.userId); // Id값을 2군대 저장.  1.바꿀아이디, 2.원래아이디
      setManageNickName(item?.name);
      setManageMail(item?.email);
      setManageMemberId(item?.memberId);
      
    }

  }, [item])

  return (
    <div className='ManagementTabUser'>
      {
        loading && <Loading/>
      }
      
      <div className='ManageUserBox'>
        <h1 className='ManageUserTitle'>
          가입일
        </h1>
        {ManageRDate || "로드중"}
      </div>
      <div className='ManageUserBox'>
        <div className='ManageUserTitleBox'>
          <h1 className='ManageUserTitle'>사용자 아이디</h1>
          <div className='ManageButton' onClick={changeUserId}>업데이트</div>
        </div>
        <div className='ManageNoticeArea'>사용자 아이디는 로그인시 사용됩니다.</div>
        <div className='ManageInputBox'>
          <input className='ManageInputText' type={'text'} value={ManageId} onChange={handleId}></input>
        </div>
        
      </div>

      <div className='ManageUserBox'>
        <div className='ManageUserTitleBox'>
          <h1 className='ManageUserTitle'>사용자 닉네임</h1>
          <div className='ManageButton' onClick={changeUserNickname}>업데이트</div>
        </div> 
        <div className='ManageNoticeArea'>사용자 닉네임은 댓글이나 컨텐츠영역에 표시되는 이름입니다.</div>
        <div className='ManageInputBox'>
          <input className='ManageInputText' type={'text'} value={ManageNickName} onChange={handleNickName}></input>
        </div>
        
      </div>

      <div className='ManageUserBox'>
        <div className='ManageUserTitleBox'>
          <h1 className='ManageUserTitle'>사용자 이메일</h1>
          <div className='ManageButton' onClick={changeUserEmail}>업데이트</div>
        </div>
        <div className='ManageNoticeArea'>사용자 이메일은 인증시에 사용되고 프로필카드에 나타납니다.</div>
        <div className='ManageInputBox'>
          <input className='ManageInputText' type={'text'} value={ManageMail} onChange={handleMail}></input>
        </div>
        
      </div>

      <div className='ManageUserBox'>
        <div className='ManageUserTitleBox'>
          <h1 className='ManageUserTitle'>비밀번호 변경</h1>
          <div className='ManageButton' onClick={changeUserPassword}>업데이트</div>
        </div>
        <div className='ManageNoticeArea'>비밀번호는 주기적으로 변경하는 것을 권장합니다.</div>
        <div className='ManageInputBox'>
          <input className='ManageInputText' type={'password'} placeholder={`비밀번호`} value={ManagePassword} onChange={handlePassword}></input>
          <input className='ManageInputText' type={'password'} placeholder={`비밀번호 확인`} value={ManageRePassword} onChange={handleRePassword}></input>
        </div>
        
      </div>

    </div>
  )
}

export default ManagementTabUser