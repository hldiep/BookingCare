import { configureStore } from '@reduxjs/toolkit';
import doctorReducer from './features/doctorSlice';
const store = configureStore({
    reducer: {
        doctor: doctorReducer,
    },
});
export default store;