import React, { useEffect, useState } from 'react'
import './SearchBlock.scss';
import SearchInput from './SearchInput';
import SearchView from './SearchView';

import defaultImg from "../../assets/img/miary_img/search.gif"
import ContentBlock from '../MainContent/ContentBlock';
import ContentView from '../MainContent/ContentView';
import {getSearchContent  } from '../../slices/SearchSlice';
import { useDispatch, useSelector } from 'react-redux';

const SearchBlock = () => {
    const [searchKeyword, setSearchKeyword] = useState();
    const [reloadSwitch, setReloadSwitch] = useState(false);


    const {rt, rtmsg, item, loading} = useSelector((state)=> state.mySearchContent);
    const dispatch = useDispatch();


    useEffect(()=>{
        //여기서 슬라이스 사용 
        if( reloadSwitch && searchKeyword){
            dispatch(getSearchContent({keyword: searchKeyword}));
            setReloadSwitch(false);
        }

    }, [reloadSwitch])
  return (
    <div className='SearchBlock'>
        <SearchInput setKeyword={setSearchKeyword} reloadSwitch={setReloadSwitch}/>
        <div className='SearchBlockBox'>
        {
            
                !loading && item ?
                item.result?.map((item)=>{
                    return <SearchView boardId={item.boardId} title={item.boardTitle} banner={item.boardBanner} content={item.boardMarkdown}
                    memberId={item.boardMemberId} boardMDate={item.boardMDate} hits={item.boardHits} 
                    like={item.boardLike} memberName={item.memberUserId} memberPic={item.memberPic} memberUserName={item.memberName}/>
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