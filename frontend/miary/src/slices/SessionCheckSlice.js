/**
 * @author Shun
 * @email vytngms@gmail.com
 * @create date 2022-09-16 19:25:11
 * @modify date 2022-09-16 22:45:38
 * @desc [세션이 필요한 페이지에서 미리 세션이 있는지 확일할 떄 쓸 기능 ]
 */

 import {createSlice, createAsyncThunk} from "@reduxjs/toolkit";
 import axios from "axios"
 import { MiaryGetAxios, MiaryPostAxios, ServerUrl } from "../components/Common_function/MiaryAxios";
 

 import {useNavigate} from 'react-router-dom';

 axios.defaults.withCredentials = true;
 
 export const sessionCheck = createAsyncThunk(
     "GET/SESSION", 
     async (payload=null, {rejectWithValue})=>{
         
         let response = null;
         let userInfo = null;

        console.log("세션검사 시작");

        try{
            response =  await axios.get(ServerUrl+ "user/current"); 
        }catch(err){
            console.error(err);
            return rejectWithValue(err);
            
        }finally{

        }
        return await response;
    }
 );
 
 const mySession = createSlice({
     name: "mySession",
     initialState:{
         rt: null,
         rtmsg: null,
         item: [],
         m_item: [],
         loading: false,
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
                rt: payload
            };
        },
     },
     extraReducers:{
         [sessionCheck.pending]: (state, action) =>{
             
             return {
                 ...state,
                 loading: true,
             };
         },
         [sessionCheck.fulfilled]: (state, {meta, payload})=>{
                console.log(payload)
            
             return{
                 rt: payload.status,
                 rtmsg: payload.statusText,
                 item: payload.data,
                 loading: false
             };
         },
         [sessionCheck.rejected]: (state, {error, payload})=>{
            
            console.log(payload.status);

             return{
                 ...state,
                 rt: payload.response.status,
                 rtmsg: payload.response.data,
                 loading: false,
             };
         },
     },
     
 })
 export const {setRt} = mySession.actions;
 export default mySession.reducer;
 