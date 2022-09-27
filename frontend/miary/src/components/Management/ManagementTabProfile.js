/**
 * @author Shun
 * @email vytngms@gmail.com
 * @create date 2022-09-27 01:17:18
 * @modify date 2022-09-27 01:17:29
 * @desc [내정보 수정에서 유저에 해당되는 컴포넌트]
 */
import React, {useState} from 'react'
import './ManagementTabProfile.scss';
import defaultProfileImg from '../../assets/img/miary_img/profile_default_03.png';

const ManagementTabProfile = () => {

    const [ProfileImg, setProfileImg] = useState();
    const [ProfileIntro, setProfileIntro] = useState();

    const handleProfileeIntro = e => setProfileIntro(e.target.value);




    //textArea 저장
    const handleSetTextArea  = (e)=>{
        setProfileIntro(e.target.value);
        
    }



    return (
        <div className='ManagementTabProfile'>

            <div className='ManageUserBox'>
                <div className='ManageUserTitleBox'>
                    <h1 className='ManageUserTitle'>사용자 이미지</h1>
                </div>
                <div className='ManageInputBox'>
                    <img className='ManageProfileImg' src={ProfileImg || defaultProfileImg}></img>
                </div>
            </div>

            <div className='ManageUserBox'>
                <div className='ManageUserTitleBox'>
                    <h1 className='ManageUserTitle'>소개</h1>
                    <div className='ManageButton'>업데이트</div>
                </div>
                <div className='ManageNoticeArea'>포스트에 있는 프로필 카드에서 자신을 소개할때 나타나는 글입니다.</div>
                <div className='ManageInputBox'>
                    <textarea className='ManageIntroArea' 
                        value={ProfileIntro}
                        placeholder={"자신을 간단히 설명해주세요" }
                        onChange={handleSetTextArea}

                    />
                </div>

            </div>

        </div>
    )
}

export default ManagementTabProfile