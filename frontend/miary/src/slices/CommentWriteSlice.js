/**
 * @author Shun
 * @email vytngms@gmail.com
 * @create date 2022-09-03 03:57:05
 * @modify date 2022-09-21 14:27:35
 * @desc [login을 위한 slice]
 */


 import {createSlice, createAsyncThunk} from "@reduxjs/toolkit";
 import axios from "axios"
 import { MiaryGetAxios, MiaryPostAxios, ServerUrl } from "../components/Common_function/MiaryAxios";
 
 axios.defaults.withCredentials = true;
 
 export const postCommentWrite = createAsyncThunk(
     "POST/MYCOMMENTWRITE", 
     async (payload, {rejectWithValue})=>{
         let result = null;
         let response = null;
         let userInfo = null;
        
        try{

            console.log("포스트 커멘트 시작");
            response = await axios({
                method: 'post',
                url: ServerUrl+"comment/",
                data: {...payload},
                header: {
                    'Content-Type': 'application/x-www-form-urlencoded;charset=UTF-8',
                    'withCredentials' : true,
                },
           });

           console.log("포스트 커멘트 종료");

           
        }catch(err){
            console.error(err);
            return rejectWithValue(err);
        
        }finally{

        }

        return await response;
    }
 );
 
 const myCommentWrite = createSlice({
     name: "myCommentWrite",
     initialState:{
         commentWrite_rt: null,
         commentWrite_rtmsg: null,
         commentWrite_item: [],
         commentWrite_m_item: [],
         commentWrite_loading: false,
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
                commentWrite_rt: payload
            };
        },
     },
     extraReducers:{
         [postCommentWrite.pending]: (state, action) =>{
             
             return {
                 ...state,
                 commentWrite_loading: true,
             };
         },
         [postCommentWrite.fulfilled]: (state, {meta, payload})=>{

             return{
                commentWrite_rt: payload.status,
                commentWrite_rtmsg: payload.statusText,
                commentWrite_item: payload.data,
                commentWrite_loading: false
             };
         },
         [postCommentWrite.rejected]: (state, {error, payload})=>{
             
            console.log("리젝트입니다...");
             return{
                 ...state,
                 commentWrite_rt: payload.response.status,
                 commentWrite_rtmsg: payload.response.data,
                 commentWrite_loading: false,
             };
         },
     },
     
 })
 
 
 export const {setRt} = myCommentWrite.actions;
 export default myCommentWrite.reducer;
 