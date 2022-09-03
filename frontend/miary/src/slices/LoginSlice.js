/**
 * @author Shun
 * @email vytngms@gmail.com
 * @create date 2022-09-03 03:57:05
 * @modify date 2022-09-03 03:59:36
 * @desc [login을 위한 slice]
 */


 import {createSlice, createAsyncThunk} from "@reduxjs/toolkit";
 import axios from "axios"
 import { MiaryGetAxios, MiaryPostAxios, ServerUrl } from "../components/Common_function/MiaryAxios";
 
 axios.defaults.withCredentials = true;
 
 export const postLogin = createAsyncThunk(
     "POST/MYLOGIN", 
     async (payload, {rejectWithValue})=>{
         let result = null;
         try{
             result = await MiaryPostAxios(ServerUrl+"user/login","", "",{...payload});
         }catch(err){
             return rejectWithValue(err.response);
         }
         return await result;
     }
 );
 
 const myLogin = createSlice({
     name: "myLogin",
     initialState:{
         rt: null,
         rtmsg: null,
         item: [],
         m_item: [],
         loading: false,
     },
     reducers: {},
     extraReducers:{
         [postLogin.pending]: (state, action) =>{
             return {
                 ...state,
                 loading: true,
             };
         },
         [postLogin.fulfilled]: (state, {meta, payload})=>{
             return{
                 rt: payload.status,
                 rtmsg: payload.statusText,
                 item: payload.data,
                 loading: false
             };
         },
         [postLogin.rejected]: (state, {payload})=>{
             
             return{
                 ...state,
                 rt: payload.status,
                 rtmsg: payload.statusText,
                 loading: false,
             };
         },
     }
 })
 
 
 
 export default myLogin.reducer;
 