import React, {useEffect, useState} from 'react'
import './MyBlogTabView.scss';
import Summary from '../MyBlogTab/Summary';
import MyBlogPost from '../MyBlogTab/MyBlogPost';


//props - memberId맴버의 아이디 
export const MyBlogTabView = (props) => {

  const [memberId, setMemberId] = useState();
  const [blogTabNumber, setTabNumber] = useState(0);

  useEffect(()=>{
    setMemberId(props?.memberId);
  },[props?.memberId]);

  const tabContent = {
    0 : <Summary memberId={memberId}/>,
    1 : <MyBlogPost memberId={memberId}/>
  }
  const changeTabHandler = (tabNum) =>{
    setTabNumber(tabNum);
  }

  useEffect(()=>{setMemberId(props.memberId);},[props?.memberId]);

  return (
    <>
    <div className='MyBlogTabView'>
      <ul className='MyBlogTabs'>
        <li ><a onClick={()=> changeTabHandler(0)} href="#">최근 포스팅</a></li>
        <li ><a onClick={()=> changeTabHandler(1)} href="#">블로그</a></li>
      </ul>
    </div>
      <div className="MyBlogTabContents">
        {tabContent[blogTabNumber]}
      </div>
    </>
  )
}

export default MyBlogTabView;
