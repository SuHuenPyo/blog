/**
 * @author Shun
 * @email vytngms@gmail.com
 * @create date 2022-09-28 19:59:17
 * @modify date 2022-09-28 20:00:34
 * @desc [검색 기능을 이용하기 위한 slice]
 */


 import {createSlice, createAsyncThunk} from "@reduxjs/toolkit";
 import axios from "axios"
 import { MiaryGetAxios, ServerUrl } from "../components/Common_function/MiaryAxios";
 
 axios.defaults.withCredentials = true;
 
 export const getSearchContent = createAsyncThunk(
     "GET/MYSEARCHCONTENT", 
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
 
 const mySearchContent = createSlice({
     name: "mySearchContent",
     initialState:{
         rt: null,
         rtmsg: null,
         item: [],
         m_item: [],
         loading: false,
     },
     reducers: {},
     extraReducers:{
         [getSearchContent.pending]: (state, action) =>{
             return {
                 ...state,
                 loading: true,
             };
         },
         [getSearchContent.fulfilled]: (state, {meta, payload})=>{
             console.log(payload);
             return{
                 rt: payload.status,
                 rtmsg: payload.statusText,
                 item: payload.data,
                 loading: false
             };
         },
         [getSearchContent.rejected]: (state, {payload})=>{
             
             return{
                 ...state,
                 rt: payload.status,
                 rtmsg: payload.statusText,
                 loading: false,
             };
         },
     }
 })
 
 
 
 export default mySearchContent.reducer;
 