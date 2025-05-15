import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    doctors: [],
};

const doctorSlice = createSlice({
    name: 'doctor',
    initialState,
    reducers: {
        setDoctors(state, action) {
            state.doctors = action.payload;
        },
        addDoctor(state, action) {
            state.doctors.push(action.payload);
        },
        removeDoctor(state, action) {
            state.doctors = state.doctors.filter(doc => doc.id !== action.payload);
        },
    },
});
export const { setDoctors, addDoctor, removeDoctor } = doctorSlice.actions;
export default doctorSlice.reducer;