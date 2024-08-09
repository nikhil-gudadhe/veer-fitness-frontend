import { createSlice, PayloadAction, createAsyncThunk } from '@reduxjs/toolkit';
import axiosInstance from '../../helpers/axiosInstance';
import { MembershipPlanFormInputs } from '../../src/types/MembershipPlanFormInputs';

interface MembershipPlanState {
    membershipPlans: MembershipPlanFormInputs[];
    loading: boolean;
    error: string | null;
    success: string | null;
  }
  
  const initialState: MembershipPlanState = {
    membershipPlans: [],
    loading: false,
    error: null,
    success: null,
  };

  export const fetchMembershipPlans = createAsyncThunk('membershipPlans/fetchMembershipPlans', async () => {
    const response = await axiosInstance.get('/plans/all-plans');
    return response.data.data;
  });
  
  export const createMembershipPlan = createAsyncThunk('membershipPlans/createMembershipPlan', async (newPlan: MembershipPlanFormInputs) => {
    const response = await axiosInstance.post('/plans/new', newPlan);
    return response.data.data;
  });
  
  export const updateMembershipPlan = createAsyncThunk('membershipPlans/updateMembershipPlan', async (updatedPlan: MembershipPlanFormInputs) => {
    const response = await axiosInstance.patch(`/plans/edit/${updatedPlan._id}`, updatedPlan);
    return response.data.data;
  });
  
  export const deleteMembershipPlan = createAsyncThunk('membershipPlans/deleteMembershipPlan', async (id: string) => {
    await axiosInstance.delete(`/plans/delete/${id}`);
    return id;
  });

  const membershipPlanSlice = createSlice({
    name: 'membershipPlans',
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
        .addCase(fetchMembershipPlans.pending, (state) => {
          state.loading = true;
          state.error = null;
        })
        .addCase(fetchMembershipPlans.fulfilled, (state, action: PayloadAction<MembershipPlanFormInputs[]>) => {
          state.loading = false;
          state.membershipPlans = action.payload;
        })
        .addCase(fetchMembershipPlans.rejected, (state, action) => {
          state.loading = false;
          state.error = action.error.message || 'Failed to fetch membership plans';
        })
        .addCase(createMembershipPlan.pending, (state) => {
          state.loading = true;
          state.error = null;
        })
        .addCase(createMembershipPlan.fulfilled, (state, action: PayloadAction<MembershipPlanFormInputs>) => {
          state.loading = false;
          state.membershipPlans.push(action.payload);
          state.success = 'Membership plan created successfully';
        })
        .addCase(createMembershipPlan.rejected, (state, action) => {
          state.loading = false;
          state.error = action.error.message || 'Failed to create membership plan';
        })
        .addCase(updateMembershipPlan.pending, (state) => {
          state.loading = true;
          state.error = null;
        })
        .addCase(updateMembershipPlan.fulfilled, (state, action: PayloadAction<MembershipPlanFormInputs>) => {
          state.loading = false;
          const index = state.membershipPlans.findIndex((plan) => plan._id === action.payload._id);
          if (index !== -1) {
            state.membershipPlans[index] = action.payload;
          }
          state.success = 'Membership plan updated successfully';
        })
        .addCase(updateMembershipPlan.rejected, (state, action) => {
          state.loading = false;
          state.error = action.error.message || 'Failed to update membership plan';
        })
        .addCase(deleteMembershipPlan.pending, (state) => {
          state.loading = true;
          state.error = null;
        })
        .addCase(deleteMembershipPlan.fulfilled, (state, action: PayloadAction<string>) => {
          state.loading = false;
          state.membershipPlans = state.membershipPlans.filter(plan => plan._id !== action.payload);
          state.success = 'Membership plan deleted successfully';
        })
        .addCase(deleteMembershipPlan.rejected, (state, action) => {
          state.loading = false;
          state.error = action.error.message || 'Failed to delete membership plan';
        });
    },
  });

  export const { resetSuccess, resetError } = membershipPlanSlice.actions;
  
  export default membershipPlanSlice.reducer;