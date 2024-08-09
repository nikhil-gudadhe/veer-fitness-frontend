import { configureStore } from '@reduxjs/toolkit';
import authSliceReducer from './Slices/authSlice';
import enquirySliceReducer from './Slices/enquirySlice';
import membershipPlanSliceReducer from './Slices/membershipPlanSlice'

const store = configureStore({
  reducer: {
    auth: authSliceReducer,
    enquiries: enquirySliceReducer,
    plans: membershipPlanSliceReducer
  },
});

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;

export default store;