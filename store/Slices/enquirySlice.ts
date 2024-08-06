import { createSlice, PayloadAction, createAsyncThunk } from '@reduxjs/toolkit';
import axiosInstance from "../../helpers/axiosInstance.ts";

interface Enquiry {
    fullName: string;
    mobile: string;
    previousGymExperience: boolean;
    reference?: string;
    fitnessGoal: string;
    target: string;
    preferredTimeSlot: string;
    note?: string;
    _id?: string;
    createdAt?: string;
    updatedAt?: string;
  }
  
  interface EnquiryState {
    enquiries: Enquiry[];
    loading: boolean;
    error: string | null;
  }
  
  const initialState: EnquiryState = {
    enquiries: [],
    loading: false,
    error: null,
  };

  export const fetchEnquiries = createAsyncThunk('enquiries/fetchEnquiries', async () => {
    const response = await axiosInstance.get('/enquiries/all-enquiries');
    return response.data.data;
  });
  
  export const createEnquiry = createAsyncThunk('enquiries/createEnquiry', async (newEnquiry: Enquiry) => {
      const response = await axiosInstance.post('/enquiries/new', newEnquiry);
      return response.data.data;
    }
  );
  
  const enquirySlice = createSlice({
    name: 'enquiries',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
      builder
        .addCase(fetchEnquiries.pending, (state) => {
          state.loading = true;
          state.error = null;
        })
        .addCase(fetchEnquiries.fulfilled, (state, action: PayloadAction<Enquiry[]>) => {
          state.loading = false;
          state.enquiries = action.payload;
        })
        .addCase(fetchEnquiries.rejected, (state, action) => {
          state.loading = false;
          state.error = action.error.message || 'Failed to fetch enquiries';
        })
        .addCase(createEnquiry.pending, (state) => {
          state.loading = true;
          state.error = null;
        })
        .addCase(createEnquiry.fulfilled, (state, action: PayloadAction<Enquiry>) => {
          state.loading = false;
          state.enquiries.push(action.payload);
        })
        .addCase(createEnquiry.rejected, (state, action) => {
          state.loading = false;
          state.error = action.error.message || 'Failed to create enquiry';
        });
    },
  });
  
  export default enquirySlice.reducer;