import React from 'react'
import { Header } from '../components/Header/Header'
import { Account } from '../components/Management/Account'
import { Profile } from '../components/Management/Profile'
import { Post } from '../components/Management/Post'
import { Form } from '../components/Management/Form'
import { Left } from '../components/Management/Left'
import Style from '../assets/css/Management.module.css'

export const Management = () => {
  return (
    <div className={Style.Management}>
      <div className={Style.Leftside}>
        <Left></Left>
      </div>
      <div className={Style.Accountside}>
        <Profile></Profile>
      </div>
    </div>
  )
}

export default Management;