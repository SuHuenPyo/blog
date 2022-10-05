/**
 * @author Shun
 * @email vytngms@gmail.com
 * @create date 2022-09-30 02:23:35
 * @modify date 2022-09-30 05:11:08
 * @desc [나의 프로필에서 사용할 slice]
 */

import {createSlice, createAsyncThunk} from "@reduxjs/toolkit";
import axios from "axios"
import { MiaryGetAxios, ServerUrl } from "../components/Common_function/MiaryAxios";

axios.defaults.withCredentials = true;

export const getMyProfile = createAsyncThunk(
    "GET/MYPROFILE", 
    async (payload, {rejectWithValue})=>{
        let result = null;
        console.log("MyProfile 시작 페이로드 : "+ JSON.stringify(payload));
        try{
            result = await MiaryGetAxios(ServerUrl+"profile/userinfo", " "," " ,{...payload});
        }catch(err){
            
            return rejectWithValue(err.response);
        }
        console.log(result);
        return await result;
    }
);

const myMyProfile = createSlice({
    name: "myMyProfile",
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
        [getMyProfile.pending]: (state, action) =>{

            return {
                ...state,
                loading: true,
            };
        },
        [getMyProfile.fulfilled]: (state, {meta, payload})=>{
            //console.log("fulfilled : " + JSON.stringify(payload));
            //console.log(payload.status);
            //if(payload.data.intro == "null") payload.data.intro = null;
            
            if(payload.response?.status == 401){
                return{
                    rt: 401,
                }
            }

            return{
                rt: payload.status,
                rtmsg: payload.statusText,
                item: payload.data,
                loading: false
            };
        },
        [getMyProfile.rejected]: (state, {payload})=>{

            return{
                ...state,
                rt: payload.status,
                rtmsg: payload.statusText,
                loading: false,
            };
        },
    }
})



export default myMyProfile.reducer;
export const {reset}  = myMyProfile.actions;
