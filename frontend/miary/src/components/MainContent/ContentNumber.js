import React, { useEffect, useState } from 'react'
import './ContentNumber.scss';

/**
 * 
 * @param {*} props changePage(바꿀페이지값), changeSwitch(리로드할지 여부 boolean), pageEnd(마지막 페이지번호), currentPage(현재페이지번호)
 * @returns 
 */
const ContentNumber = (props) => {

  const [PageGroup,setPageGroup] = useState([]);                      //보여줄 페이지넘버 그룹 (ex> 최대 번호가 8일때 1,2,3,4,5 )  5개씩  

  useEffect(()=>{
    
    
    if(props.pageEnd > 1 ){
      
      console.log(props);
      
      let maxPage = props.currentPage;
      let temp = [];

       ///console.log(props.CurrentPage);
      

      let startIndex = props.currentPage -2;
      if(props.pageEnd <= 5){
        startIndex = 1;
        maxPage = props.pageEnd - 2;
      }
      
      if(((props.pageEnd - 2) < props.currentPage ) && props.pageEnd > 5){
        maxPage -=(props.pageEnd - props.currentPage);
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
      e.target.innerHTML == props.currentPage  
      ) return ; //잘못된값 필터

    switch (e.target.innertHTML){
        
      default : {
        props.changePage(e.target.innerHTML);
        break;
      }
        
    }
    props.changeSwitch(true);
  }
  const ChangePage = (target) => {
    if(target) props.changePage(props.pageEnd);
    if(!target) props.changePage(1);
    props.changeSwitch(true);
  }
  
  return (
    <div className='ContentNumber'>
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
            console.log(item);
            console.log(props.currentPage);
            if(item == props.currentPage) return <div className='CommentPagenationNumber CommentPagenationCurrent' key={(idx)}>{item}</div>
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


export default ContentNumber