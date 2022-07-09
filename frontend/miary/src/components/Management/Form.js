import React from 'react'
import Style from '../../assets/css/Form.module.css'

export const Form = () => {
  return (
    <div>
        <div className={Style.Formfull}>
            <input type="text" placeholder="서식의 제목" className={Style.Formtitle}></input>
            <textarea placeholder="서식의 내용을 입력하세요." className={Style.Formcontent}></textarea>
            <button className={Style.Formbutton}>서식 등록</button>        
        </div>
    </div>
  )
}

export default Form;