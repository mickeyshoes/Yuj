import { configureStore, getDefaultMiddleware } from '@reduxjs/toolkit';
import storage from 'redux-persist/lib/storage';
import { combineReducers } from '@reduxjs/toolkit';
import { persistReducer } from 'redux-persist';
import studioSampleSlice from './studioSampleSlice';
import studioSlice from './studioSlice';
import commonSlice from './commonSlice';
import lectureSlice from './lectureSlice';
import userSlice from './userSlice';

const reducers = combineReducers({
    common: commonSlice.reducer,
    studioSample: studioSampleSlice.reducer,
    studio: studioSlice.reducer,
    lecture: lectureSlice.reducer,
    user: userSlice.reducer,
})

const persistConfig = {
    key: 'yuj',
    storage,
    blacklist: ['studio', 'lecture', 'studioSample'],
}

const persistedReducer = persistReducer(persistConfig, reducers);

const store = configureStore({
    reducer: persistedReducer,
    middleware: getDefaultMiddleware({
        serializableCheck: false
    })
})

export default store;