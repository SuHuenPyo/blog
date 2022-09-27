import React, { useEffect } from 'react'
import ContentComment from './ContentComment'

const ContentCommentGroup = (props) => {


  useEffect(()=>{

    console.log("ContentCommentGroup UseEffect 실행 ");
  }, [])

  return (
    <div className='ContentCommentGroup'>
        {
            !props ||
            props.data.map((item, idx)=>(
              
                <ContentComment 
                    key={item.commentId} 
                    ProfileImg={item.Image} 
                    ProfileName={item.Name} 
                    ProfileMemberId={item.memberId}
                    ProfileOwnerId={item.ownerId}
                    ProfileContent={item.Content} 
                    ProfileTime={item.rDate} 
                    ProfileToMsg={item.toMsg}
                    ProfileBoardId={item.boardId}
                    ProfileGroup={item.groupId}
                    reloadSwitch={props.reloadSwitch}
                    
                />
            ))
        }
    </div>
  )
}

export default ContentCommentGroup