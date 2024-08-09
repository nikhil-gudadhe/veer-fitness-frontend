import { createSlice, PayloadAction, createAsyncThunk } from '@reduxjs/toolkit';
import axiosInstance from '../../helpers/axiosInstance';
import { EnquiryFormInputs } from '../../src/types/EnquiryFormInputs.ts';

interface EnquiryState {
  enquiries: EnquiryFormInputs[];
  loading: boolean;
  error: string | null;
  success: string | null;
}

const initialState: EnquiryState = {
  enquiries: [],
  loading: false,
  error: null,
  success: null
};

export const fetchEnquiries = createAsyncThunk('enquiries/fetchEnquiries', async () => {
  const response = await axiosInstance.get('/enquiries/all-enquiries');
  return response.data.data;
});

export const createEnquiry = createAsyncThunk('enquiries/createEnquiry', async (newEnquiry: EnquiryFormInputs) => {
  const response = await axiosInstance.post('/enquiries/new', newEnquiry);
  return response.data.data;
});

// export const updateEnquiry = createAsyncThunk('enquiries/updateEnquiry', async (updatedEnquiry: EnquiryFormInputs, { dispatch }) => {
//   const response = await axiosInstance.patch(`/enquiries/edit/${updatedEnquiry._id}`, updatedEnquiry);
//   //dispatch(fetchEnquiries()); // Re-fetch enquiries after updating
//   return response.data.data;
// });

export const updateEnquiry = createAsyncThunk('enquiries/updateEnquiry', async (updatedEnquiry: EnquiryFormInputs) => {
  const response = await axiosInstance.patch(`/enquiries/edit/${updatedEnquiry._id}`, updatedEnquiry);
  return response.data.data;
});


const enquirySlice = createSlice({
  name: 'enquiries',
  initialState,
  reducers: {
    resetSuccess(state) {
      state.success = null;
    },
    resetError(state) {
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchEnquiries.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchEnquiries.fulfilled, (state, action: PayloadAction<EnquiryFormInputs[]>) => {
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
      .addCase(createEnquiry.fulfilled, (state, action: PayloadAction<EnquiryFormInputs>) => {
        state.loading = false;
        state.enquiries.push(action.payload);
        state.success = 'Enquiry created successfully';
      })
      .addCase(createEnquiry.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || 'Failed to create enquiry';
      })
      .addCase(updateEnquiry.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(updateEnquiry.fulfilled, (state, action: PayloadAction<EnquiryFormInputs>) => {
        state.loading = false;
        const index = state.enquiries.findIndex((enquiry) => enquiry._id === action.payload._id);
        if (index !== -1) {
          state.enquiries[index] = action.payload;
        }
        state.success = 'Enquiry updated successfully';
      })

      .addCase(updateEnquiry.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || 'Failed to update enquiry';
      });
  },
});

export const { resetSuccess, resetError } = enquirySlice.actions;

export default enquirySlice.reducer;