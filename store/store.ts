import { configureStore } from '@reduxjs/toolkit';
import authSliceReducer from './Slices/authSlice';
import enquirySliceReducer from './Slices/enquirySlice';
import membershipPlanSliceReducer from './Slices/membershipPlanSlice'
import memberSliceReducer from './Slices/memberSlice'
import invoiceSliceReducer from './Slices/invoiceSlice'

import { persistStore, persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage';

const persistConfig = {
  key: 'root',
  storage,
  whitelist: ['auth'],
};

const persistedAuthReducer = persistReducer(persistConfig, authSliceReducer);

const store = configureStore({
  reducer: {
    auth: persistedAuthReducer,
    enquiries: enquirySliceReducer,
    plans: membershipPlanSliceReducer,
    members: memberSliceReducer,
    invoices: invoiceSliceReducer
  },
});

export const persistor = persistStore(store);
export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;

export default store;