/**
 * @author Shun
 * @email vytngms@gmail.com
 * @create date 2022-09-27 01:17:18
 * @modify date 2022-10-05 11:14:29
 * @desc [내정보 수정에서 유저에 해당되는 컴포넌트]
 */
import React, {useEffect, useRef, useState} from 'react'
import './ManagementTabProfile.scss';
import defaultProfileImg from '../../assets/img/miary_img/profile_default_03.png';
import { useDispatch, useSelector } from 'react-redux';
import { getMyInfo, reset } from '../../slices/ManageUserSlice';
import { MiaryPostAxios, MiaryPutAxios, ServerUrl } from '../Common_function/MiaryAxios';
import Loading from '../Common_function/Loading';

const ManagementTabProfile = () => {

    const [ProfileImg, setProfileImg] = useState(); //유저에게 보이는 이미지데이터
    const [ProfileIntro, setProfileIntro] = useState();
    const [ProfileImgData, setProfileImgData] = useState();//API 서버에 전송할 이미지 데이터 

    const [ManageMemberId, setManageMemberId] = useState(); //맴버 아이디

    const [originUserId, setOriginUserId] = useState(); // 유저의 원래 로그인 아이디

    const [bLoading, setBLoading] = useState(false); // 로딩 여부  true시 로딩중

    const refProfileInputImg = useRef();

    const {rt, rtmsg, item, loading} = useSelector((state)=> state.myUserInfo);
    const dispatch = useDispatch();

    
    const handleProfileIntro = e => setProfileIntro(e.target.value);

    const saveProfileImg = (e) => {
        setProfileImg(URL.createObjectURL(e.target.files[0]));
        setProfileImgData(e.target.files[0]);

        
    }
    const handleClickProfileInput = e => refProfileInputImg.current?.click();
    

    const uploadProfileImg = async() => {
        
        try {
            setBLoading(true);

            if(!ProfileImgData || (ProfileImg == item?.image)) { //프로필업로드 안됬을때 필터링
                window.alert('먼저 프로필 이미지를 눌러서 업로드 해주세요.');
                return;
            }
            if(!window.confirm('정말 프로필 이미지를 변경합니까?')) return;
            
            /**
             * 대충 업로드 api 사용 코드 들어갈 영역 
            */
            let bodyFormData = new FormData();
            bodyFormData.append('imgs', ProfileImgData);
            let response = await MiaryPostAxios(ServerUrl+'images/', bodyFormData);
            let result = null;
            
    
            if(response.status != 200){
                window.alert('잘못된 이미지 데이터 입니다.');
                return;
            }
            if(response?.data){
    
                result = await MiaryPutAxios(ServerUrl+'user/image',  {
                    userLoginId: originUserId,
                    newImage : response.data,
                    memberId: ManageMemberId,
                });
                if(result.data){
                    window.alert('프로필 이미지가 업데이트 되었습니다.');
                }else{
                    window.alert('문제가 발생했습니다. 관리자에게 문의해주세요.');
                }
    
            }

        } catch (error) {
            console.error(error);
        }finally{
            setBLoading(false);
        }
        
        

    }
      //유저 자기소개 변경
    const changeUserIntro = async() => {

        try{
            setBLoading(true);

            if(ProfileIntro == item?.intro) {
                window.alert('먼저 소개란을 변경해주세요.');
                return;
            }
            let response = await MiaryPutAxios(ServerUrl+'user/intro',  {
                userLoginId: originUserId,
                newIntro :ProfileIntro,
                memberId:ManageMemberId,
            });
            if(response.data){
                window.alert("나의소개가 업데이트 되었습니다.");
            }else{
                window.alert(response.response.data);
            }

        }catch(err){
            console.error(err);
        }finally{
            setBLoading(false);
        }
       
  }

    //맨처음에 프로필이미지가 존재하는지, 소개란이 있는지 확인후 엘리먼트에 값을 채워준다.
    useEffect(()=>{
        
        console.log("ManagementTabProfile 처음 UseEffect 실행!");
        
        dispatch(getMyInfo({}));
        
    
        return () => {
          //dispatch(reset({}));
          console.log("ManagementTabProfile 언마운트 useEffect 실행!");
        }
      },[]);

      //값이 들어오면 엘리먼트를 채워준다.
      useEffect(()=>{
        if(item == null || item.length == 0) {
            console.log('item 값이 비었네요 ');
            return;
        }
        //name, image, userId, email ,memberId, rdate, intro 
        console.log("ManagementTabProfile redux item값 변경되어서 UseEffect 실행 Item값 : " + JSON.stringify(item) );
    
        console.log(item);
        console.log(item.length);
        console.log(typeof(item));
        if(item){
            setProfileImg(item?.image);
            setProfileIntro(item?.intro);
            setOriginUserId(item?.userId); // Id값을 2군대 저장.  1.바꿀아이디, 2.원래아이디
            setManageMemberId(item?.memberId);  //유저의 m_id
        }
    
      }, [item])

    return (
        <div className='ManagementTabProfile'>
            {loading && <Loading/>}
            {bLoading && <Loading/>}
            <div className='ManageUserBox'>
                <div className='ManageUserTitleBox'>
                    <h1 className='ManageUserTitle'>사용자 이미지</h1>
                    <div className='ManageButton' onClick={uploadProfileImg}>업데이트</div>
                </div>
                <div className='ManageInputBox'>
                    <input className='ManageInputImg' ref={refProfileInputImg} type="file" accept='image/*' onChange={saveProfileImg}/>
                    <div className='ManageNoticeArea'>자신의 프로필 이미지를 변경합니다. 프로필 카드와, 댓글의 이미지가 변경됩니다.</div>
                    <img className='ManageProfileImg' src={ProfileImg || defaultProfileImg} onClick={handleClickProfileInput}></img>
                    
                </div>
            </div>

            <div className='ManageUserBox'>
                <div className='ManageUserTitleBox'>
                    <h1 className='ManageUserTitle'>소개</h1>
                    <div className='ManageButton' onClick={changeUserIntro}>업데이트</div>
                </div>
                <div className='ManageNoticeArea'>포스트에 있는 프로필 카드에서 자신을 소개할때 나타나는 글입니다.</div>
                <div className='ManageInputBox'>
                    <textarea className='ManageIntroArea' 
                        value={ProfileIntro}
                        placeholder={"자신을 간단히 설명해주세요" }
                        onChange={handleProfileIntro}

                    />
                </div>

            </div>

        </div>
    )
}

export default ManagementTabProfile