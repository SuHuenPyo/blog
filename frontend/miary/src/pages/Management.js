import React from 'react'
import { Account } from './Account'
import { Profile } from './Profile'
import { Post } from './Post'
import { Form } from './Form'
import { Left } from './Left'
import Style from '../asset/css/Management.module.css'

export const Management = () => {
  return (
    <div className={Style.Management}>
      <div className={Style.Leftside}>
        <Left></Left>
      </div>
      <div className={Style.Accountside}>
        <Account></Account>
      </div>
    </div>
  )
}
