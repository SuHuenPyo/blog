import React from 'react'
import Style from '../../assets/css/Post.module.css'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faLeftLong } from '@fortawesome/free-solid-svg-icons/faLeftLong'
import { faRightLong } from '@fortawesome/free-solid-svg-icons/faRightLong'
import { faAnglesLeft } from '@fortawesome/free-solid-svg-icons/faAnglesLeft'
import { faAnglesRight } from '@fortawesome/free-solid-svg-icons/faAnglesRight'
import { faAngleRight } from '@fortawesome/free-solid-svg-icons/faAngleRight'

export const Post = () => {
  return (
    <div className={Style.Postfull}>
        <div className={Style.Post2}>
            <div className={Style.Title}>#
                <a href="/">제목</a>
            </div>
            <div className={Style.Quantity}>#
                <a href="/">분량</a>
            </div>
            <div className={Style.Produce}>#
                <a href="/">생성</a>
            </div>
            <div className={Style.Revise}>#
                <a href="/">수정</a>
            </div>
            <div className={Style.Recommend}>#
                <a href="/">추천</a>
            </div>
            <div className={Style.Comment}>#
                <a href="/">댓글</a>
            </div>
            <div className={Style.hiding}>#
                <a href="/">숨김</a>
            </div>
            <div className={Style.Tviews}>#
                <a href="/">오늘 조회수</a>
            </div>
            <div className={Style.Yviews}>#
                <a href="/">어제 조회수</a>
            </div>
        </div>
        <nav className={Style.Pagenumber}>
            <div className={Style.Page}>
                <div className={Style.Nextpage}>
                    <a href="/">
                        <FontAwesomeIcon icon={faLeftLong} className={Style.Faleft} />
                    </a>
                </div>
                <div className={Style.Nextpage1}>
                    <a href="/">
                        <FontAwesomeIcon icon={faAnglesLeft} className={Style.Faanglesleft} />
                    </a>
                </div>
                <div className={Style.Nextpage2}>
                    <a href="/">
                        1
                    </a>
                </div>
                <div className={Style.Nextpage3}>
                    <a href="/">
                        <FontAwesomeIcon icon={faAnglesRight} className={Style.Faright} />
                    </a>
                </div>
                <div className={Style.Nextpage4}>
                    <a href="/">
                        <FontAwesomeIcon icon={faRightLong} className={Style.Faanglesright} />
                    </a>
                </div>
            </div>
            <div className={Style.Gopage}>
                <span className={Style.Gopage1}>Go to page</span>
                <input className={Style.Page2} type="number" min="1" max="1"></input>
                <button className={Style.Gobutton}>
                    Go
                    <FontAwesomeIcon icon={faAngleRight} className={Style.Faangleright} />
                </button>
            </div>
        </nav>
    </div>
  )
}

export default Post;

