import React, { useEffect, useState } from 'react'
import './SearchBlock.scss';
import SearchInput from './SearchInput';
import SearchView from './SearchView';

import defaultImg from "../../assets/img/miary_img/search.gif"
import ContentBlock from '../MainContent/ContentBlock';
import ContentView from '../MainContent/ContentView';

const SearchBlock = () => {
    const [searchKeyword, setSearchKeyword] = useState();


    const getSearchKeyword = (value) => {
        setSearchKeyword(value);

    }

    useEffect(()=>{
        //여기서 슬라이스 사용 

    }, [searchKeyword])
  return (
    <div className='SearchBlock'>
        <SearchInput/>
        <div className='SearchBlockBox'>
        {
            
                !searchKeyword ?
                ['가나다', '라마다', 'ㄴㄹㄴ','가나다', '라마다', 'ㄴㄹㄴ','가나다', '라마다', 'ㄴㄹㄴ',
                '가나다', '라마다', 'ㄴㄹㄴ','가나다', '라마다', 'ㄴㄹㄴ','가나다', '라마다', 'ㄴㄹㄴ',].map((item)=>{
                    return <SearchView content={`${item}`}/>
                })
                
            :
            <div className='SearchBlockDefaultImgBox'>
                <img src={defaultImg}></img>

                </div>
            
            
        }
        </div>
        
    </div>
  )
}

export default SearchBlock