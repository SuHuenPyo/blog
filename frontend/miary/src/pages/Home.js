import React from 'react'
import Content from '../components/Content/Content'
import { Footer } from '../components/Footer/Footer'
import Header from '../components/Header/Header'



const Home = () => {
    const headerTools = [
        {tools1: '글 쓰기', tools2: '프로필'}
       ]
  return (
    <div className='Home'>
        <Header tools1={headerTools[0].tools1} tools2={headerTools[0].tools2}></Header>
        <Content></Content>
        <Footer></Footer>
    </div>
  )
}

export default Home;

