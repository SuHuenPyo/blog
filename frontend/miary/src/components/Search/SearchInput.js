import React, { useRef, useState } from 'react'
import './SearchInput.scss';
import {
    FaSearch, // 돋보기
    FaBell,
    FaGreaterThanEqual, //종(알림) 
       
} from 'react-icons/fa';

const SearchInput = () => {

    const [inputText, setInputText] = useState();

    const refSubmitBtn = useRef();
    const refInputBox = useRef();

    const SubmitSearchText  = (e) =>{
        e.preventDefault();
        if(!inputText){
            window.alert('검색어를 입력해주세요 ex> 개발자');
            refInputBox.current.style = `border-color: red;  animation: vibration 0.1s 5;`;
            return;
        }
        
    }
    const handleInputText = (e) => {
        setInputText(e.target.value);
        if(e.target.value){
            refSubmitBtn.current.style=`
                background-color: rgba(0,0,0,0.8);
                color: white;
            `;
            refInputBox.current.style=`border: 1px solid rgba(0, 0, 0, 0.8)`;
        }else{
            refSubmitBtn.current.style=``;
            refInputBox.current.style=``;
        }

    }
    const handleFocusInput = (e) => {
        refSubmitBtn.current.style=`
            background-color: rgba(0,0,0,0.8);
            color: white;
        `;
        refInputBox.current.style=`border: 1px solid rgba(0, 0, 0, 0.8)`;
    }
    const handleBlurInput = (e) => {
        if(!e.target.value){
            refSubmitBtn.current.style=``;
            refInputBox.current.style=``;
        }
    }

  return (
    <div className='SearchInput'>
        
        <form onSubmit={SubmitSearchText}>
            <div className='SearchContainer'>
                <div className='SeearchBox' ref={refInputBox}>
                    <input className='SearchInputText' onChange={handleInputText} type={'text'} onFocus={handleFocusInput} onBlur={handleBlurInput} placeholder={`ex> 개발자`}></input>
                    <button className='SearchInputBtn' ref={refSubmitBtn} type={'submit'} ><FaSearch/></button>
                </div>
                
            </div>
        </form>
        
    </div>
  )
}

export default SearchInput