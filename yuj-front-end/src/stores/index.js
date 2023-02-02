import { configureStore } from '@reduxjs/toolkit';
import studioSampleSlice from './studioSampleSlice'
import studioSlice from './studioSlice'

const store = configureStore({
    reducer: {
        studioSample: studioSampleSlice.reducer,
        studio: studioSlice.reducer,
    }
})

export default store;