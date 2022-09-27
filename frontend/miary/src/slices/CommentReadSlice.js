/**
 * @author Shun
 * @email vytngms@gmail.com
 * @create date 2022-09-20 08:16:49
 * @modify date 2022-09-21 07:27:36
 * @desc [댓글을 읽어오기 위한 slice]
 */



 import {createSlice, createAsyncThunk} from "@reduxjs/toolkit";
 import axios from "axios"
 import { MiaryGetAxios, MiaryPostAxios, ServerUrl } from "../components/Common_function/MiaryAxios";
 
 axios.defaults.withCredentials = true;
 
 export const getComment = createAsyncThunk(
     "POST/MYGETCOMMENT", 
     async (payload, {rejectWithValue})=>{
        let result = null;
        try{
            result = await MiaryGetAxios(ServerUrl+"comment/","", "",{...payload});
        }catch(err){
            return rejectWithValue(err.response);
        }
        return await result;
    }
 );
 
 const myCommentGet = createSlice({
     name: "myCommentGet",
     initialState:{
         commentGet_rt: null,
         commentGet_rtmsg: null,
         commentGet_item: [],
         commentGet_m_item: [],
         commentGet_loading: false,
     },
     reducers: {
        /**
         * 
         * @param {number} state rt 그냥 rt만 쓰기
         * @param {*} action 바꿀값 {data: xx}
         */
        setRt: (state, {payload}) =>{
            
            return {
                ...state,
                commentGet_rt: payload
            };
        },
     },
     extraReducers:{
         [getComment.pending]: (state, action) =>{
             
             return {
                 ...state,
                 commentGet_loading: true,
             };
         },
         [getComment.fulfilled]: (state, {meta, payload})=>{
             console.log(payload.data);
             
             return{
                commentGet_rt: payload.status,
                commentGet_rtmsg: payload.statusText,
                commentGet_item: payload.data,
                commentGet_loading: false
             };
         },
         [getComment.rejected]: (state, {error, payload})=>{

             return{
                 ...state,
                 commentGet_rt: payload.response.status,
                 commentGet_rtmsg: payload.response.data,
                 commentGet_loading: false,
             };
         },
     },
     
 })
 
 
 export const {setRt} = myCommentGet.actions;
 export default myCommentGet.reducer;
 