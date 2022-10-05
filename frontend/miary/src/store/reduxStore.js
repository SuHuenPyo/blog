/**
 * @author Shun
 * @email vytngms@gmail.com
 * @create date 2022-08-30 09:27:12
 * @modify date 2022-10-01 17:46:17
 * @desc [리덕스 스토어]
 */

import {configureStore, getDefaultMiddleware} from '@reduxjs/toolkit';
import profileSlice from '../slices/profileSlice';
import contentDetailSlice from '../slices/ContentDetailSlice';
import LoginSlice from '../slices/LoginSlice';
import ContentSlice from '../slices/ContentSlice';
import SessionCheckSlice from '../slices/SessionCheckSlice';
import LogoutSlice from '../slices/LogoutSlice';
import CommentWriteSlice from '../slices/CommentWriteSlice';
import CommentReadSlice from '../slices/CommentReadSlice';
import SearchSlice from '../slices/SearchSlice';
import MyProfileSlice from '../slices/MyProfileSlice';
import RecentPostSlice from '../slices/RecentPostSlice';
import PostMyContentSlice from '../slices/PostMyContentSlice';
import ManageUserSlice from '../slices/ManageUserSlice';

//slice



const Store = configureStore({
    reducer: {
        profile: profileSlice,
        myContentDetail: contentDetailSlice,
        myLogin : LoginSlice,
        myContent : ContentSlice,
        mySession : SessionCheckSlice,
        myLogout : LogoutSlice,
        myCommentWrite : CommentWriteSlice,
        myCommentGet: CommentReadSlice,
        mySearchContent : SearchSlice,
        myMyProfile : MyProfileSlice,
        myRecentMyPost : RecentPostSlice,
        myPostMyContent : PostMyContentSlice,
        myUserInfo : ManageUserSlice,
        
        
    },
    middleware: [...getDefaultMiddleware({serializableCheck: false})],
    devTools: false

});

export default Store;