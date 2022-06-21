import logo from './logo.svg';
import './App.scss';
import React from "react";
import {Route, Routes} from "react-router-dom";


import Home from './pages/Home';
import MyBlog from './pages/MyBlog';
import AboutAll from './pages/AboutAll';
import {Search} from './pages/Search';
import Setting from './pages/Setting';
import WritePost from './pages/WritePost';
//route


function App() {
//jira test
  return (
    <div className="App">
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/home" element={<Home />} />
        <Route path="/search" element={<Search />} />
        <Route path="/myblog" element={<MyBlog />} />
        <Route path="/setting" element={<Setting />} />
        <Route path="/aboutall" element={<AboutAll />} />
        <Route path="/write_post" element={<WritePost />} />

      </Routes>
   
    </div>
  );
}

export default App;
