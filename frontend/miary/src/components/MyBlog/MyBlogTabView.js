import React, {useState} from 'react'
import './MyBlogTabView.scss';
import Summary from '../MyBlogTab/Summary';
import MyBlogPost from '../MyBlogTab/MyBlogPost';
import Introduce from '../MyBlogTab/Introduce';

export const MyBlogTabView = () => {
  const MyBlogTabs = {
    0: <Summary/>,
    1: <MyBlogPost/>,
    2: <Introduce/>,
  }

  const [blogTabNumber, setTabNumber] = useState(0);

  const changeTabHandler = (num)=>{
    setTabNumber(num);
  }


  return (
    <>
    <div className='MyBlogTabView'>
      <ul className='MyBlogTabs'>
        <li ><a onClick={()=> changeTabHandler(0)} href="#">개요</a></li>
        <li ><a onClick={()=> changeTabHandler(1)} href="#">블로그</a></li>
        <li ><a onClick={()=> changeTabHandler(2)} href="#">소개</a></li>
      </ul>
    </div>
      <div className="MyBlogTabContents">
        {MyBlogTabs[blogTabNumber]}
      </div>
    </>
  )
}

export default MyBlogTabView;
