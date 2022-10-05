/**
 * @author Shun
 * @email vytngms@gmail.com
 * @create date 2022-09-28 19:59:17
 * @modify date 2022-09-30 07:43:36
 * @desc [검색 기능을 이용하기 위한 slice]
 */


 import {createSlice, createAsyncThunk} from "@reduxjs/toolkit";
 import axios from "axios"
 import { MiaryGetAxios, ServerUrl } from "../components/Common_function/MiaryAxios";
 
 axios.defaults.withCredentials = true;
 
 export const getMyRecentPost = createAsyncThunk(
     "GET/MYRECENTPOST", 
     async (payload, {rejectWithValue})=>{
         let result = null;
         try{
             result = await MiaryGetAxios(ServerUrl+"post/myrecent","글 가져오기 성공", "글 가져오기 실패",{...payload});
         }catch(err){
             console.log(err.response);
             return rejectWithValue(err.response);
         }
         return await result;
     }
 );
 
 const myRecentMyPost = createSlice({
     name: "myRecentMyPost",
     initialState:{
         rt: null,
         rtmsg: null,
         item: [],
         m_item: [],
         loading: false,
     },
     reducers: {
        reset: (state) => {
            return {
                ...state,
                rt: null,
                rtmsg: null,
                item: [],
                m_item: [],
                loading: false,
            }
        },


     },
     extraReducers:{
         [getMyRecentPost.pending]: (state, action) =>{
             return {
                 ...state,
                 loading: true,
             };
         },
         [getMyRecentPost.fulfilled]: (state, {meta, payload})=>{
             console.log(payload);
             return{
                 rt: payload.status,
                 rtmsg: payload.statusText,
                 item: payload.data,
                 loading: false
             };
         },
         [getMyRecentPost.rejected]: (state, {payload})=>{
             
            console.log(state);
            console.log(payload);
             return{
                 ...state,
                 rt: payload.status,
                 rtmsg: payload.statusText,
                 loading: false,
             };
         },
     }
 })
 
 
 
 export default myRecentMyPost.reducer;
 export const {reset}  = myRecentMyPost.actions;
 
