import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axiosInstance from '../../helpers/axiosInstance';
import { Invoice } from '../../src/types/Invoice.ts';

interface InvoiceState {
    invoices: Invoice[],
    currentInvoice: Invoice | null;
    loading: boolean;
    error: string | null;
}

const initialState: InvoiceState = {
    invoices: [],
    currentInvoice: null,
    loading: false,
    error: null,
};

export const createInvoice = createAsyncThunk('invoice/createInvoice', async (invoiceData: any, thunkAPI) => {
    try {
        const response = await axiosInstance.post('/invoices/generate-invoice', invoiceData);
        return response.data;
    } catch (error) {
        return thunkAPI.rejectWithValue(error || 'Failed to create invoice');
    }
});

export const fetchInvoiceById = createAsyncThunk('invoice/fetchInvoiceById', async (invoiceId: string, thunkAPI) => {
    try {
        const response = await axiosInstance.get(`/invoices/${invoiceId}`);
        return response.data;
    } catch (error) {
        return thunkAPI.rejectWithValue(error || 'Failed to fetch invoice');
    }
});

export const fetchInvoiceByMemberId = createAsyncThunk(
    'invoice/fetchInvoiceByMemberId',
    async (memberId: string, thunkAPI) => {
      try {
        const response = await axiosInstance.get(`/invoices/fetch-invoices/${memberId}`);
        return response.data;
      } catch (error) {
        return thunkAPI.rejectWithValue(error || 'Failed to fetch invoice');
      }
    }
  );

  const invoiceSlice = createSlice({
    name: 'invoice',
    initialState,
    reducers: {
      resetInvoiceState: (state) => {
        state.currentInvoice = null;
        state.loading = false;
        state.error = null;
      },
    },
    extraReducers: (builder) => {
      builder
        .addCase(createInvoice.pending, (state) => {
          state.loading = true;
          state.error = null;
        })
        .addCase(createInvoice.fulfilled, (state, action) => {
          state.loading = false;
          state.currentInvoice = action.payload;
          state.invoices.push(action.payload);
        })
        .addCase(createInvoice.rejected, (state, action) => {
          state.loading = false;
          state.error = action.payload as string;
        })
        .addCase(fetchInvoiceById.pending, (state) => {
          state.loading = true;
          state.error = null;
        })
        .addCase(fetchInvoiceById.fulfilled, (state, action) => {
          state.loading = false;
          state.currentInvoice = action.payload;
        })
        .addCase(fetchInvoiceById.rejected, (state, action) => {
          state.loading = false;
          state.error = action.payload as string;
        })
        .addCase(fetchInvoiceByMemberId.pending, (state) => {
          state.loading = true;
          state.error = null;
        })
        .addCase(fetchInvoiceByMemberId.fulfilled, (state, action) => {
          state.loading = false;
          const { invoices } = action.payload; // Extract invoices from payload
          state.invoices = invoices || [];  // Ensure invoices are handled correctly
        })
        .addCase(fetchInvoiceByMemberId.rejected, (state, action) => {
          state.loading = false;
          state.error = action.payload as string;
        });
    },
  });
  
export const { resetInvoiceState } = invoiceSlice.actions;

export default invoiceSlice.reducer;