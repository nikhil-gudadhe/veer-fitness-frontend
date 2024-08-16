import { createSlice, PayloadAction, createAsyncThunk } from '@reduxjs/toolkit';
import axiosInstance from '../../helpers/axiosInstance';
import {MemberFormInputs} from '../../src/types/MemberFormInputs';

interface MemberState {
    members: MemberFormInputs[];
    currentMember?: MemberFormInputs;
    loading: boolean;
    error: string | null;
    success: string | null;
}

const initialState: MemberState = {
    members: [],
    currentMember: undefined,
    loading: false,
    error: null,
    success: null,
};

export const fetchMembers = createAsyncThunk('members/fetchMembers', async () => {
    const response = await axiosInstance.get('/members/all-members');
    return response.data.data;
});

export const fetchActiveMembers = createAsyncThunk('members/fetchActiveMembers', async () => {
    const response = await axiosInstance.get('/members/active-members');
    return response.data.data;
});

export const fetchInactiveMembers = createAsyncThunk('members/fetchInactiveMembers', async () => {
    const response = await axiosInstance.get('/members/inactive-members');
    return response.data.data;
});

export const registerMember = createAsyncThunk('members/registerMember', async (newMember: MemberFormInputs) => {
    const response = await axiosInstance.post('/members/register', newMember);
    return response.data.data;
});

export const updateMember = createAsyncThunk('members/updateMember', async (updatedMember: MemberFormInputs) => {
      const response = await axiosInstance.patch(`/members/edit/${updatedMember._id}`, updatedMember);
      return response.data.data;
});

export const deleteMember = createAsyncThunk('members/deleteMember', async (id: string) => {
    await axiosInstance.delete(`/members/${id}`);
    return id;
});

// export const fetchMemberById = createAsyncThunk('members/fetchMemberById',async (id: string) => {
//     const response = await axiosInstance.get(`/members/${id}`);
//     return response.data.data;
// });

export const fetchMemberById = createAsyncThunk('members/fetchMemberById', async (id: string, { rejectWithValue }) => {
    try {
        const response = await axiosInstance.get(`/members/${id}`);
        return response.data.data;
    } catch (error) {
        //error.response?.data?.message
        return rejectWithValue(error || 'Failed to fetch member');
    }
});

export const extendMembership = createAsyncThunk('members/extendMembership', async (data: { memberId: string, duration: number, newPlanId?: string }) => {
    const response = await axiosInstance.post('/members/extend-membership', data);
    return response.data.data;
});


const memberSlice = createSlice({
    name: 'members',
    initialState,
    reducers: {
        resetSuccess(state) {
            state.success = null;
        },
        resetError(state) {
            state.error = null;
        },
        clearCurrentMember(state) {
            state.currentMember = undefined;
        },
    },
    extraReducers: (builder) => {
        builder
        
            .addCase(fetchMembers.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(fetchMembers.fulfilled, (state, action: PayloadAction<MemberFormInputs[]>) => {
                state.loading = false;
                state.members = action.payload;
            })
            .addCase(fetchMembers.rejected, (state, action) => {
                state.loading = false;
                state.error = action.error.message || 'Failed to fetch members';
            })
            .addCase(registerMember.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(registerMember.fulfilled, (state, action: PayloadAction<MemberFormInputs>) => {
                state.loading = false;
                state.members.push(action.payload);
                state.success = 'Member registered successfully';
            })
            .addCase(registerMember.rejected, (state, action) => {
                state.loading = false;
                state.error = action.error.message || 'Failed to register member';
            })
            .addCase(updateMember.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(updateMember.fulfilled, (state, action: PayloadAction<MemberFormInputs>) => {
                state.loading = false;
                const index = state.members.findIndex((member) => member._id === action.payload._id);
                if (index !== -1) {
                  state.members[index] = action.payload;
                }
                state.success = 'Member updated successfully';
            })
            .addCase(updateMember.rejected, (state, action) => {
                state.loading = false;
                state.error = action.error.message || 'Failed to update member';
            })
            .addCase(deleteMember.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(deleteMember.fulfilled, (state, action: PayloadAction<string>) => {
                state.loading = false;
                state.members = state.members.filter(member => member._id !== action.payload);
                state.success = 'Member deleted successfully';
            })
            .addCase(deleteMember.rejected, (state, action) => {
                state.loading = false;
                state.error = action.error.message || 'Failed to delete member';
            })
            .addCase(extendMembership.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(extendMembership.fulfilled, (state, action: PayloadAction<MemberFormInputs>) => {
                state.loading = false;
                const index = state.members.findIndex((member) => member._id === action.payload._id);
                if (index !== -1) {
                    state.members[index] = action.payload;
                }
                state.success = 'Membership extended successfully';
            })
            .addCase(extendMembership.rejected, (state, action) => {
                state.loading = false;
                state.error = action.error.message || 'Failed to extend membership';
            })
            // Handle fetching a single member by ID
            .addCase(fetchMemberById.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(fetchMemberById.fulfilled, (state, action: PayloadAction<MemberFormInputs>) => {
                state.loading = false;
                state.currentMember = action.payload;
                state.success = 'Member fetched successfully';
            })
            .addCase(fetchMemberById.rejected, (state, action) => {
                state.loading = false;
                state.error = action.error.message || 'Failed to fetch member';
            })
            // .addCase(fetchMemberById.pending, (state) => {
            //     state.loading = true;
            //     state.error = null;
            // })
            // .addCase(fetchMemberById.fulfilled, (state, action: PayloadAction<MemberFormInputs>) => {
            //     state.loading = false;
            //     state.currentMember = action.payload; // Updated from selectedMember
            //     state.success = 'Member fetched successfully';
            // })
            // .addCase(fetchMemberById.fulfilled, (state, action: PayloadAction<MemberFormInputs>) => {
            //     state.loading = false;
            //     const memberIndex = state.members.findIndex(member => member._id === action.payload._id);
            //     if (memberIndex !== -1) {
            //       state.members[memberIndex] = action.payload;
            //     } else {
            //       state.members.push(action.payload);
            //     }
            //     state.success = 'Member fetched successfully';
            // })
            // .addCase(fetchMemberById.rejected, (state, action) => {
            //     state.loading = false;
            //     state.error = action.error.message || 'Failed to fetch member';
            // });
    },
});

export const { resetSuccess, resetError } = memberSlice.actions;

export default memberSlice.reducer;