import { createSlice, PayloadAction, createAsyncThunk } from '@reduxjs/toolkit';
import axiosInstance from '../../helpers/axiosInstance';

interface InvoiceState {
    currentInvoice: any | null;
    loading: boolean;
    error: string | null;
}

const initialState: InvoiceState = {
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
            });
    },
});

export const { resetInvoiceState } = invoiceSlice.actions;

export default invoiceSlice.reducer;