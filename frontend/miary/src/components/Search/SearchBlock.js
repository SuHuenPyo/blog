import React, { useEffect, useState } from 'react'
import './SearchBlock.scss';
import SearchInput from './SearchInput';
import SearchView from './SearchView';

import defaultImg from "../../assets/img/miary_img/search.gif"
import ContentBlock from '../MainContent/ContentBlock';
import ContentView from '../MainContent/ContentView';
import {getSearchContent, reset  } from '../../slices/SearchSlice';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';

const SearchBlock = () => {
    const [searchKeyword, setSearchKeyword] = useState();
    const [reloadSwitch, setReloadSwitch] = useState(false);


    const {rt, rtmsg, item, loading} = useSelector((state)=> state.mySearchContent);
    const dispatch = useDispatch();


    useEffect(()=>{
        //초기화 redux-toolkit state
        

        return () => {
            console.log('SearchBlock 컴포넌트 삭제 -- redux-toolkit state initializing..');
            dispatch(reset({}));            
        }
        
        
        

    },[])

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
                item.result?.map((item, index)=>{
                    
                    return <Link to={`/contentDetail/${item.boardId}`} key={index}>
                                <SearchView 
                                    boardId={item.boardId} title={item.boardTitle} banner={item.boardBanner} content={item.boardMarkdown}
                                    memberId={item.boardMemberId} boardMDate={item.boardMDate} hits={item.boardHits} 
                                    like={item.boardLike} memberName={item.memberUserId} memberPic={item.memberPic} memberUserName={item.memberName}
                                />
                            </Link>
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