/**
 * @author Shun
 * @email vytngms@gmail.com
 * @create date 2022-08-30 13:16:55
 * @modify date 2022-09-25 00:54:00
 * @desc [컨텐츠 상세보기시 사용할 slice ]
 */

 import {createSlice, createAsyncThunk} from "@reduxjs/toolkit";
 import axios from "axios"
 import { MiaryGetAxios, ServerUrl } from "../components/Common_function/MiaryAxios";
 
 axios.defaults.withCredentials = true;
 
 export const getContentDetail = createAsyncThunk(
     "GET/MYCONTENTDETAIL", 
     async (payload, {rejectWithValue})=>{
         let result = null;
         try{
             result = await MiaryGetAxios(ServerUrl+"post/detail","", "",{...payload});
         }catch(err){
             return rejectWithValue(err.response);
         }
         return await result;
     }
 );
 
 const myContentDetail = createSlice({
     name: "myContentDetail",
     initialState:{
         rt: null,
         rtmsg: null,
         item: [],
         m_item: [],
         loading: false,
     },
     reducers: {},
     extraReducers:{
         [getContentDetail.pending]: (state, action) =>{
             return {
                 ...state,
                 loading: true,
             };
         },
         [getContentDetail.fulfilled]: (state, {meta, payload})=>{
             return{
                 rt: payload.status,
                 rtmsg: payload.statusText,
                 item: payload.data,
                 loading: false
             };
         },
         [getContentDetail.rejected]: (state, {payload})=>{
             
             return{
                 ...state,
                 rt: payload.status,
                 rtmsg: payload.statusText,
                 loading: false,
             };
         },
     }
 })
 
 
 
 export default myContentDetail.reducer;
 