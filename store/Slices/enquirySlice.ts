import { createSlice, PayloadAction, createAsyncThunk } from '@reduxjs/toolkit';
import axiosInstance from '../../helpers/axiosInstance';
import { EnquiryFormInputs } from '../../src/types/EnquiryFormInputs.ts';

interface EnquiryState {
  enquiries: EnquiryFormInputs[];
  loading: boolean;
  error: string | null;
  success: string | null;
  totalEnquiries: number;
  rowsPerPage: number;
  totalPages: number;
  currentPage: number;
}

const initialState: EnquiryState = {
  enquiries: [],
  loading: false,
  error: null,
  success: null,
  totalEnquiries: 0,
  rowsPerPage: 5,
  totalPages: 0,
  currentPage: 1,
};

// Fetch enquiries with pagination
export const fetchEnquiries = createAsyncThunk('enquiries/fetchEnquiries', async ({ page = 1, limit = 10 }: { page?: number; limit?: number; }, thunkAPI) => {
    try {
      const response = await axiosInstance.get('/enquiries/all-enquiries', {
        params: { page, limit },
      });
      return response.data;
    } catch (error) {
      //error.response.data.message
      return thunkAPI.rejectWithValue(error || 'Failed to fetch enquiries');
    }
  }
);

export const searchEnquiries = createAsyncThunk('enquiries/searchEnquiries', async ({ searchTerm, page = 1, limit = 10 }: { searchTerm: string; page?: number; limit?: number }, thunkAPI) => {
    try {
      const response = await axiosInstance.get('/enquiries/search', {
        params: { searchTerm, page, limit },
      });
      return response.data;
    } catch (error) {
      //error.response.data.message
      return thunkAPI.rejectWithValue(error || 'Failed to search enquiries');
    }
  }
);

export const createEnquiry = createAsyncThunk('enquiries/createEnquiry', async (newEnquiry: EnquiryFormInputs) => {
  const response = await axiosInstance.post('/enquiries/new', newEnquiry);
  return response.data.data;
});

export const updateEnquiry = createAsyncThunk('enquiries/updateEnquiry', async (updatedEnquiry: EnquiryFormInputs) => {
  const response = await axiosInstance.patch(`/enquiries/edit/${updatedEnquiry._id}`, updatedEnquiry);
  return response.data.data;
});

export const deleteEnquiry = createAsyncThunk('enquiries/deleteEnquiry', async (id: string, thunkAPI) => {
  try {
    const response = await axiosInstance.delete(`/enquiries/${id}`);
    return { id, message: response.data.message };
  } catch (error) {
    //error.response.data.message
    return thunkAPI.rejectWithValue(error || 'Failed to delete enquiry');
  }
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
      .addCase(fetchEnquiries.fulfilled, (state, action: PayloadAction<any>) => {
        state.loading = false;
        state.enquiries = action.payload.data.enquiries.sort((a: any, b: any) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());
        state.totalEnquiries = action.payload.data.totalEnquiries;
        state.totalPages = action.payload.data.totalPages;
        state.currentPage = action.payload.data.currentPage;
      })
      .addCase(fetchEnquiries.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || 'Failed to fetch enquiries';
      })
      .addCase(searchEnquiries.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(searchEnquiries.fulfilled, (state, action: PayloadAction<any>) => {
        state.loading = false;
        state.enquiries = action.payload.data.enquiries;
        state.totalEnquiries = action.payload.data.totalEnquiries;
        state.totalPages = action.payload.data.totalPages;
        state.currentPage = action.payload.data.currentPage;
      })
      .addCase(searchEnquiries.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || 'Failed to search enquiries';
      })
      .addCase(createEnquiry.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(createEnquiry.fulfilled, (state, action: PayloadAction<EnquiryFormInputs>) => {
        state.loading = false;
        state.enquiries.unshift(action.payload);
        state.enquiries.sort((a: any, b: any) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());
        state.totalEnquiries += 1;
        if (state.enquiries.length > state.rowsPerPage) {
          state.enquiries.pop(); // Remove the last item to maintain the page limit
        }
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
      })
      .addCase(deleteEnquiry.fulfilled, (state, action) => {
        state.enquiries = state.enquiries.filter((enquiry) => enquiry._id !== action.payload.id);
        state.totalEnquiries -= 1;
        state.success = action.payload.message;
      })
      .addCase(deleteEnquiry.rejected, (state, action) => {
        state.error = action.payload as string;
      })
  },
});

export const { resetSuccess, resetError } = enquirySlice.actions;

export default enquirySlice.reducer;