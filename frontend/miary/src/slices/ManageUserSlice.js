/**
 * @author Shun
 * @email vytngms@gmail.com
 * @create date 2022-09-28 19:59:17
 * @modify date 2022-10-03 19:08:30
 * @desc [검색 기능을 이용하기 위한 slice]
 */


 import {createSlice, createAsyncThunk} from "@reduxjs/toolkit";
 import axios from "axios"
 import { MiaryGetAxios, ServerUrl } from "../components/Common_function/MiaryAxios";
 
 axios.defaults.withCredentials = true;
 
 export const getMyInfo = createAsyncThunk(
     "GET/MYUSERINFO", 
     async (payload, {rejectWithValue})=>{
         let result = null;
         try{
            //name, image, userId, email ,memberId, rdate, intro 
             result = await MiaryGetAxios(ServerUrl+"profile/userinfo","글 가져오기 성공", "글 가져오기 실패",{...payload});
         }catch(err){
             console.log(err.response);
             return rejectWithValue(err.response);
         }
         return await result;
     }
 );
 
 const myUserInfo = createSlice({
     name: "myUserInfo",
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
         [getMyInfo.pending]: (state, action) =>{
             return {
                 ...state,
                 loading: true,
             };
         },
         [getMyInfo.fulfilled]: (state, {meta, payload})=>{
             console.log(payload);
             return{
                 rt: payload.status,
                 rtmsg: payload.statusText,
                 item: payload.data,
                 loading: false
             };
         },
         [getMyInfo.rejected]: (state, {payload})=>{
             
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
 
 
 
 export default myUserInfo.reducer;
 export const {reset}  = myUserInfo.actions;
 
