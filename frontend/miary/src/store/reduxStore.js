/**
 * @author Shun
 * @email vytngms@gmail.com
 * @create date 2022-08-30 09:27:12
 * @modify date 2022-08-30 13:41:12
 * @desc [리덕스 스토어]
 */

import {configureStore, getDefaultMiddleware} from '@reduxjs/toolkit';
import profileSlice from '../slices/profileSlice';
import contentDetailSlice from '../slices/ContentDetailSlice';

//slice



const Store = configureStore({
    reducer: {
        profile: profileSlice,
        myContentDetail: contentDetailSlice,
    },
    middleware: [...getDefaultMiddleware({serializableCheck: false})],
    devTools: false

});

export default Store;