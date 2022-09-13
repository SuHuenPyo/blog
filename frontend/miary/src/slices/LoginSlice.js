/**
 * @author Shun
 * @email vytngms@gmail.com
 * @create date 2022-09-03 03:57:05
 * @modify date 2022-09-06 01:24:44
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
         let response = null;
        try{
            response = await axios({
                method: 'post',
                url: ServerUrl+"user/signin",
                data: {...payload},
                header: {
                    'Content-Type': 'application/x-www-form-urlencoded;charset=UTF-8',
                    'withCredentials' : true,
                },
           });
           
        }catch(err){
            console.error(err);
            return rejectWithValue(err);
        
        }finally{

        }
        
        return await response;
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
         [postLogin.pending]: (state, action) =>{
             
             return {
                 ...state,
                 loading: true,
             };
         },
         [postLogin.fulfilled]: (state, {meta, payload})=>{
             console.log(payload?.status);
             return{
                 rt: payload.status,
                 rtmsg: payload.statusText,
                 item: payload.data,
                 loading: false
             };
         },
         [postLogin.rejected]: (state, {error, payload})=>{
             

             return{
                 ...state,
                 rt: payload.response.status,
                 rtmsg: payload.response.data,
                 loading: false,
             };
         },
     },
     
 })
 
 
 export const {setRt} = myLogin.actions;
 export default myLogin.reducer;
 