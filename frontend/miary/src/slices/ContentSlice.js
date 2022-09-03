/**
 * @author Shun
 * @email vytngms@gmail.com
 * @create date 2022-09-03 08:11:48
 * @modify date 2022-09-03 08:30:39
 * @desc [홈에서 불러올 컨텐츠들]
 */


 import {createSlice, createAsyncThunk} from "@reduxjs/toolkit";
 import axios from "axios"
 import { MiaryGetAxios, ServerUrl } from "../components/Common_function/MiaryAxios";
 
 axios.defaults.withCredentials = true;
 
 export const getContent = createAsyncThunk(
     "GET/MYCONTENT", 
     async (payload, {rejectWithValue})=>{
         let result = null;
         try{
             result = await MiaryGetAxios(ServerUrl+"post","글 가져오기 성공", "글 가져오기 실패",{...payload});
         }catch(err){
             return rejectWithValue(err.response);
         }
         return await result;
     }
 );
 
 const myContent = createSlice({
     name: "myContent",
     initialState:{
         rt: null,
         rtmsg: null,
         item: [],
         m_item: [],
         loading: false,
     },
     reducers: {},
     extraReducers:{
         [getContent.pending]: (state, action) =>{
             return {
                 ...state,
                 loading: true,
             };
         },
         [getContent.fulfilled]: (state, {meta, payload})=>{
             console.log(payload);
             return{
                 rt: payload.status,
                 rtmsg: payload.statusText,
                 item: payload.data,
                 loading: false
             };
         },
         [getContent.rejected]: (state, {payload})=>{
             
             return{
                 ...state,
                 rt: payload.status,
                 rtmsg: payload.statusText,
                 loading: false,
             };
         },
     }
 })
 
 
 
 export default myContent.reducer;
 