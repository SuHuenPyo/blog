/**
 * @author Shun
 * @email vytngms@gmail.com
 * @create date 2022-09-03 03:57:05
 * @modify date 2022-09-21 12:54:34
 * @desc [login을 위한 slice]
 */


 import {createSlice, createAsyncThunk} from "@reduxjs/toolkit";
 import axios from "axios"
 import { MiaryGetAxios, MiaryPostAxios, ServerUrl } from "../components/Common_function/MiaryAxios";
 
 axios.defaults.withCredentials = true;
 
 export const getLogout = createAsyncThunk(
     "POST/MYLOGOUT", 
     async (payload, {rejectWithValue})=>{
         let result = null;
         let response = null;
         let userInfo = null;
        console.log("슬라이스 함수 시작입니다.");
        try{

            sessionStorage.clear();
            response = await axios.get(ServerUrl+ "user/out"); 

        }catch(err){
            console.error(err);
            return rejectWithValue(err);
        
        }finally{

        }

        return await response;
    }
 );
 
 const myLogout = createSlice({
     name: "myLogout",
     initialState:{
         rt: null,
         rtmsg: null,
         item: [],
         m_item: [],
         loading: false,
     },
     reducers: {
     },
     extraReducers:{
         [getLogout.pending]: (state, action) =>{

             return {
                 ...state,
                 loading: true,
             };
         },
         [getLogout.fulfilled]: (state, {meta, payload})=>{
            window.alert("로그아웃 되었습니다.");
            window.location.reload();
             return{
                 rt: payload.status,
                 rtmsg: payload.statusText,
                 item: payload.data,
                 loading: false
             };
         },
         [getLogout.rejected]: (state, {error, payload})=>{
            window.alert("로그인 상태가 아닙니다.");
             return{
                 ...state,
                 rt: payload.response.status,
                 rtmsg: payload.response.data,
                 loading: false,
             };
         },
     },
     
 })
 
  

 export default myLogout.reducer;
 