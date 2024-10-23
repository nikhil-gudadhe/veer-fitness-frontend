import { configureStore } from '@reduxjs/toolkit';
import authSliceReducer from './Slices/authSlice';  // Make sure this path is correct and the reducer is properly exported
import enquirySliceReducer from './Slices/enquirySlice';
import membershipPlanSliceReducer from './Slices/membershipPlanSlice';
import memberSliceReducer from './Slices/memberSlice';
import invoiceSliceReducer from './Slices/invoiceSlice';

// Configure the Redux store
const store = configureStore({
  reducer: {
    auth: authSliceReducer,  // Ensure this is initialized after it's been imported
    enquiries: enquirySliceReducer,
    plans: membershipPlanSliceReducer,
    members: memberSliceReducer,
    invoices: invoiceSliceReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false, // Disable the serializable check
    }),
});

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;

export default store;