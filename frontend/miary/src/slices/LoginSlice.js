/**
 * @author Shun
 * @email vytngms@gmail.com
 * @create date 2022-09-03 03:57:05
 * @modify date 2022-09-21 13:46:24
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
         let userInfo = null;
        console.log("슬라이스 함수 시작입니다.");
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

           //성공했다면 
           userInfo = await axios.get(ServerUrl+ "profile/userinfo"); 

           sessionStorage.setItem("userName", userInfo.data.name);
           sessionStorage.setItem("userImage",userInfo.data.image);
           
        }catch(err){
            console.error(err);
            return rejectWithValue(err);
        
        }finally{

        }
        
        console.log("슬라이스 함수 종료직전입니다.");
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
             console.log("펜딩 입니다.");
             
             return {
                 ...state,
                 loading: true,
             };
         },
         [postLogin.fulfilled]: (state, {meta, payload})=>{
//             console.log(payload?.status);
            console.log("풀필입니다..");
            console.log(222222222222222);
             return{
                 rt: payload.status,
                 rtmsg: payload.statusText,
                 item: payload.data,
                 loading: false
             };
         },
         [postLogin.rejected]: (state, {error, payload})=>{
             
            console.log("리젝트입니다...");
            window.alert("아이디 또는 비밀번호가 틀렸거나 존재하지 않습니다.");
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
 