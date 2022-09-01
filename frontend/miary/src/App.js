import logo from './logo.svg';
import './App.scss';
import { useState } from 'react';
import React from "react";
import {Route, Routes} from "react-router-dom";






import Home from './pages/Home';
import MyBlog from './pages/MyBlog';
import AboutAll from './pages/AboutAll';
import Search from './pages/Search';
import Setting from './pages/Setting';
import WritePost from './pages/WritePost';
import Management from './pages/Management';
import ContentDetail from './pages/ContentDetail';


import Header from './components/Header/Header';
import Footer from './components/Footer/Footer';



function App() {
//jira test


  return (
    <div className="App">
      <Header></Header>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/home" element={<Home />} />
        <Route path="/search" element={<Search />} />
        <Route path="/myblog" element={<MyBlog />} />
        <Route path="/setting" element={<Setting />} />
        <Route path="/aboutall" element={<AboutAll />} />
        <Route path="/write_post" element={<WritePost />} />
        <Route path="/management" element={<Management />} />
        <Route path="/contentDetail/:contentId" element={<ContentDetail/>} />
      </Routes>
      <Footer></Footer>
      {/* <Login></Login> */}


    </div>
  );
}

export default App;
