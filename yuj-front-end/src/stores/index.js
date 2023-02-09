import { configureStore } from '@reduxjs/toolkit';
import studioSampleSlice from './studioSampleSlice';
import studioSlice from './studioSlice';
import commonSlice from './commonSlice';
import userSlice from './userSlice';

const store = configureStore({
    reducer: {
        common: commonSlice.reducer,
        studioSample: studioSampleSlice.reducer,
        studio: studioSlice.reducer,
        user: userSlice.reducer,
    }
})

export default store;