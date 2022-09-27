/**
 * @author Shun
 * @email vytngms@gmail.com
 * @create date 2022-08-30 09:27:12
 * @modify date 2022-09-20 08:22:07
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
        
        
    },
    middleware: [...getDefaultMiddleware({serializableCheck: false})],
    devTools: false

});

export default Store;