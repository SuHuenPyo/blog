import React, { useEffect, useState } from 'react'
import './CommentNumber.scss';

/**
 * 
 * @param {*} props changePage( 보여줄 페이지번호를 저장할 state), CurrentPage(현재 페이지를 저장하는 state), pageEnd(현재 댓글의 최대페이지넘버)
 * @returns 
 */
const CommentNumber = (props) => {

  
  const [reloadSwitch, setReloadSwitch] = useState(true);              //useEffect 스위치

  const [PageGroup,setPageGroup] = useState([]);                      //보여줄 페이지넘버 그룹 (ex> 최대 번호가 8일때 1,2,3,4,5 )  5개씩  

  useEffect(()=>{
    
    
    if(props.pageEnd > 1 && reloadSwitch){
      
      console.log(props);
      
      let minPage = 0;
      let maxPage = props.CurrentPage;
      let temp = [];

       ///console.log(props.CurrentPage);
      

      let startIndex = props.CurrentPage -2;
      if(props.pageEnd <= 5){
        startIndex = 1;
        maxPage = props.pageEnd - 2;
      }
      
      if(((props.pageEnd - 2) < props.CurrentPage ) && props.pageEnd > 5){
        maxPage -=(props.pageEnd - props.CurrentPage);
        startIndex = props.pageEnd - 4;
      }
      
      //console.log(`PageEnd : ${props.pageEnd}   startIndex : ${startIndex}  maxPage: ${maxPage}` )


      let maxPageInt = parseInt(maxPage);
      for(startIndex; startIndex <= (maxPageInt+2) ; startIndex++){  // 현재인덱스의 -2~ +2 만큼이니 총 5개를 보여줄 예정 
        //만약 현재 페이지가 1번,2번이면 1번넘버에 하이라이트가 들어오고 5번까지 인덱스 해줘야한다. 
        if( (startIndex < 1)){
          maxPageInt++;
        }else if( (temp.length == 0) && startIndex <= props.pageEnd){
          temp=[startIndex];
        }

        else{
          if(startIndex <= props.pageEnd) temp = [...temp, startIndex]; 
          
        }

      }
      console.log(temp)
      
      setPageGroup(temp);
      
    }
    
    
  },[props])

  const ChangeNumberPage = (e) => {
    console.log( e.target.innerHTML);
    if(
      e.target.innerHTML > props.pageEnd &&
      e.target.innerHTML < 1  &&
      e.target.innerHTML == props.CurrentPage  
      ) return ; //잘못된값 필터

    switch (e.target.innertHTML){
        
      default : {
        props.changePage(e.target.innerHTML);
        break;
      }
        
    }
  }
  const ChangePage = (target) => {
    if(target) props.changePage(props.pageEnd);
    if(!target) props.changePage(1);
  }
  
  return (
    <div className='CommentNumber'>
      <div className='CommentNumberContainer'>
      
      
      
      <div className='CommentPagenationArrowBox'>
        <div className='CommentPagenationLeftArrow' onClick={()=>{ChangePage(0)}}>
        {'<<'}
        </div>
      </div>
      {
        props &&
        <div className='CommentPagenationNumberBox'>
           {PageGroup.map((item, idx) => {
            
            if(item == props.CurrentPage) return <div className='CommentPagenationNumber CommentPagenationCurrent' key={(idx)}>{item}</div>
            return <div className='CommentPagenationNumber' key={(idx)} onClick={ChangeNumberPage}>{item}</div>
          })} 
        </div>
      }
      <div className='CommentPagenationArrowBox'>
        <div className='CommentPagenationRightArrow' onClick={()=>{ChangePage(1)}}>
          {'>>'}
        </div>
      </div>
      
      
      </div>
    </div>
  )
}

export default CommentNumber