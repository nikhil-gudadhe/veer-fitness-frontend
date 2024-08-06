import { configureStore } from '@reduxjs/toolkit';
import authSliceReducer from './Slices/authSlice';
import enquiryReducer from './Slices/enquirySlice';

const store = configureStore({
  reducer: {
    auth: authSliceReducer,
    enquiries: enquiryReducer
  },
});

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;

export default store;