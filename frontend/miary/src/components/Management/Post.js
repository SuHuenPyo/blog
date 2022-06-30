import React from 'react'
import Style from '../../assets/css/Post.module.css'

export const Post = () => {
  return (
    <div className={Style.Postfull}>
        <div className={Style.Post2}>
            <div className={Style.Title}>
                <a href="/">제목</a>
            </div>
            <div className={Style.Quantity}>
                <a href="/">분량</a>
            </div>
            <div className={Style.Produce}>
                <a href="/">생성</a>
            </div>
            <div className={Style.Revise}>
                <a href="/">수정</a>
            </div>
            <div className={Style.Recommend}>
                <a href="/">추천</a>
            </div>
            <div className={Style.Comment}>
                <a href="/">댓글</a>
            </div>
            <div className={Style.hiding}>
                <a href="/">숨김</a>
            </div>
            <div className={Style.Tviews}>
                <a href="/">오늘 조회수</a>
            </div>
            <div className={Style.Yviews}>
                <a href="/">어제 조회수</a>
            </div>
        </div>
        <nav className={Style.Pagenumber}>
            <div>
                <div className={Style.Page}>1</div>
            </div>
            <div className={Style.Gopage}>
                <span>Go to page</span>
            </div>
        </nav>
    </div>
  )
}

export default Post;