import { createSlice, PayloadAction, createAsyncThunk } from "@reduxjs/toolkit";
import axiosInstance from "../../helpers/axiosInstance.ts";
import { UserFormInputs } from "../../src/types/UserFormInputs.ts";

interface AuthState {
  isAuthenticated: boolean;
  user: UserFormInputs | null; 
  users: UserFormInputs[];
  accessToken: string | null;
  refreshToken: string | null;
  totalUsers: number;
  totalPages: number;
  currentPage: number;
  loading: boolean;
  fetchUsersLoading: boolean;
  error: string | null;
  success: string | null;
}

const initialState: AuthState = {
  isAuthenticated: false,
  user: null,   
  users: [], 
  accessToken: null,
  refreshToken: null,
  totalUsers: 0,
  totalPages: 0,
  currentPage: 1,
  loading: false,
  fetchUsersLoading: false,
  error: null,
  success: null
}

// Register user
export const registerUser = createAsyncThunk("auth/registerMember", async (data: any, { rejectWithValue }) => {
  try {
    const response = await axiosInstance.post("/users/register", data);
    return response.data;
  } catch (error) {
    return rejectWithValue(error || 'Registration failed');
  }
});

// Update user
export const updateUser = createAsyncThunk("auth/updateUser", async (updatedUser: UserFormInputs, { rejectWithValue }) => {
      try {
          const response = await axiosInstance.patch(`/users/edit/${updatedUser._id}`, updatedUser);
          return response.data;
      } catch (error: any) {
          return rejectWithValue(
              error.response?.data?.message || "Failed to update the user"
          );
      }
  }
);

// Delete user
export const deleteUser = createAsyncThunk("auth/deleteUser", async (userId: string, { rejectWithValue }) => {
      try {
          const response = await axiosInstance.delete(`/users/delete/${userId}`);
          return response.data;
      } catch (error: any) {
          return rejectWithValue(
              error.response?.data?.message || "Failed to delete user"
          );
      }
  }
);

// Login user
export const loginUser = createAsyncThunk("auth/loginUser", async (data: any) => {
  const response = await axiosInstance.post("/users/login", data);
  return response.data;
});

// Get current user
export const getCurrentUser = createAsyncThunk("auth/getCurrentUser", async () => {
  const response = await axiosInstance.get("/users/user-account");
  return response.data;
});

// Logout user
export const logoutUser = createAsyncThunk("auth/logoutUser", async () => {
  await axiosInstance.post("/users/logout");
  return null;
});

// Search user
export const searchUsers = createAsyncThunk('users/searchUsers',
  async ({ searchTerm, page = 1, limit = 10 }: { searchTerm: string; page?: number; limit?: number }, thunkAPI) => {
    try {
      const response = await axiosInstance.get('/users/search', {
        params: { searchTerm, page, limit },
      });
      return response.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error || 'Failed to search user');
    }
  }
);

// Fetch user
export const fetchUsers = createAsyncThunk('users/fetchUsers', 
  async ({ page = 1, limit = 10 }: { page?: number; limit?: number; }, thunkAPI) => {
  try {
    const response = await axiosInstance.get('/users/all-users', {
      params: { page, limit },
    });
    return response.data;
  } catch (error) {
    return thunkAPI.rejectWithValue(error || 'Failed to fetch users');
  }
}
);

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    logout(state) {
      state.isAuthenticated = false;
      state.user = null;
    },
    resetSuccess(state) {
      state.success = null;
    },
    resetError(state) {
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(registerUser.pending, (state) => {
      state.loading = true;
      state.error = null;
    });
    builder.addCase(registerUser.fulfilled, (state, action:  PayloadAction<UserFormInputs>) => {
      state.loading = false;
      console.log(action.payload);
      state.users.unshift(action.payload); 
      state.users = state.users.slice(0, 5);
      state.success = 'User registered successfully'; 
    });
    builder.addCase(registerUser.rejected, (state, action) => {
      state.loading = false;
      state.error = action.payload as string || "User registration failed";
    });

    builder.addCase(updateUser.pending, (state) => {
        state.loading = true;
        state.error = null;
    });
    builder.addCase(updateUser.fulfilled, (state, action) => {
        state.loading = false;
        const updatedUser = action.payload;
        const index = state.users.findIndex((user) => user._id === updatedUser._id);
        if (index !== -1) {
            state.users[index] = updatedUser;
        }
        //state.success = "User updated successfully";
    });
    
    builder.addCase(updateUser.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
    });

    builder.addCase(loginUser.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(loginUser.fulfilled, (state, action) => {
      state.loading = false;
      state.isAuthenticated = true;
      state.accessToken = action.payload.data.accessToken;
      state.refreshToken = action.payload.data.refreshToken;
      state.user = action.payload.data;

    });
    builder.addCase(loginUser.rejected, (state, action) => {
      state.loading = false;
      state.isAuthenticated = false;
      state.error = action.error.message || "Login failed";
    });

    builder.addCase(getCurrentUser.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(getCurrentUser.fulfilled, (state, action) => {
      state.loading = false;
      state.isAuthenticated = true;
      state.user = action.payload.data;
    });
    builder.addCase(getCurrentUser.rejected, (state) => {
      state.loading = false;
      state.isAuthenticated = false;
      state.user = null;
    });

    builder.addCase(fetchUsers.pending, (state) => {
      state.fetchUsersLoading = true;
      state.error = null;
    });
    builder.addCase(fetchUsers.fulfilled, (state, action) => {
      state.fetchUsersLoading = false;
      state.users = action.payload.data.users.sort((a: any, b: any) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());;
      state.totalUsers = action.payload.data.totalUsers;
      state.totalPages = action.payload.data.totalPages;
      state.currentPage = action.payload.data.currentPage;
    });
    builder.addCase(fetchUsers.rejected, (state, action) => {
      state.fetchUsersLoading = false;
      state.error = action.payload as string;
    });

    builder.addCase(searchUsers.pending, (state) => {
      state.loading = true;
      state.error = null;
    })
    builder.addCase(searchUsers.fulfilled, (state, action) => {
        state.loading = false;
        state.users = action.payload.data.users;
        state.totalUsers = action.payload.data.totalUsers;
        state.totalPages = action.payload.data.totalPages;
        state.currentPage = action.payload.data.currentPage;
    })
    builder.addCase(searchUsers.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || 'Failed to search users';
    })

    builder.addCase(deleteUser.pending, (state) => {
    state.loading = true;
    state.error = null;
    });

    builder.addCase(deleteUser.fulfilled, (state, action) => {
        state.loading = false;
        const deletedUserId = action.payload.data._id;
        state.users = state.users.filter((user) => user._id !== deletedUserId);
        state.success = "User deleted successfully";
    });

    builder.addCase(deleteUser.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
    });

    builder.addCase(logoutUser.fulfilled, (state) => {
      state.isAuthenticated = false;
      state.user = null;
      state.accessToken = null;
      state.refreshToken = null;
      state.loading = false;
      state.error = null;
    });
  },
});

export const { logout, resetSuccess, resetError} = authSlice.actions;

export default authSlice.reducer;