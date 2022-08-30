/**
 * @author Shun
 * @email vytngms@gmail.com
 * @create date 2022-08-30 11:32:43
 * @modify date 2022-08-30 15:05:16
 * @desc [프로필 카드에서 사용하는 슬라이스]
 */
import {createSlice, createAsyncThunk} from "@reduxjs/toolkit";
import axios from "axios"
import { MiaryGetAxios, ServerUrl } from "../components/Common_function/MiaryAxios";

axios.defaults.withCredentials = true;

export const getProfile = createAsyncThunk(
    "GET/PROFILE", 
    async (payload, {rejectWithValue})=>{
        let result = null;
        console.log("PROFILE 시작 페이로드 : "+ JSON.stringify(payload));
        try{
            result = await MiaryGetAxios(ServerUrl+"profile/id", "","" ,{...payload});
        }catch(err){
            return rejectWithValue(err.response);
        }
        return await result;
    }
);

const myProfile = createSlice({
    name: "profile",
    initialState:{
        rt: null,
        rtmsg: null,
        item: [],
        m_item: [],
        loading: false,
    },
    reducers: {},
    extraReducers:{
        [getProfile.pending]: (state, action) =>{
            return {
                ...state,
                loading: true,
            };
        },
        [getProfile.fulfilled]: (state, {meta, payload})=>{
            console.log("fulfilled : " + JSON.stringify(payload));
            console.log(payload.status);
            return{
                rt: payload.status,
                rtmsg: payload.statusText,
                item: payload.data,
                loading: false
            };
        },
        [getProfile.rejected]: (state, {payload})=>{
            return{
                ...state,
                rt: payload.status,
                rtmsg: payload.statusText,
                loading: false,
            };
        },
    }
})



export default myProfile.reducer;
