import { configureStore } from '@reduxjs/toolkit';
import studioSlice from './studioSlice'

const store = configureStore({
    reducer: {
        studio: studioSlice.reducer,
    }
})

export default store;