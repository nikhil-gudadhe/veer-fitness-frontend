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
  error: null,
  success: null,
}

// Register member
export const registerUser = createAsyncThunk("auth/registerMember", async (data: any, { rejectWithValue }) => {
  try {
    const response = await axiosInstance.post("/users/register", data);
    return response.data;
  } catch (error) {
    return rejectWithValue(error || 'Registration failed');
  }
});

export const updateUser = createAsyncThunk("", async (updatedUser: UserFormInputs) => {
  // const response = await axiosInstance.patch(`/members/edit/${updatedMember._id}`, updatedMember);
  // return response.data.data;
});

export const deleteUser = createAsyncThunk("", async (updatedUser: UserFormInputs) => {
  // const response = await axiosInstance.patch(`/members/edit/${updatedMember._id}`, updatedMember);
  // return response.data.data;
});

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
    // builder.addCase(registerUser.pending, (state) => {
    //   state.loading = true;
    //   state.error = null;
    // });
    // builder.addCase(registerUser.fulfilled, (state, action:  PayloadAction<UserFormInputs>) => {
    //   state.loading = false;
    //   console.log(action.payload);
    //   state.users.unshift(action.payload); 
    //   state.users = state.users.slice(0, 5);
    //   state.success = 'User registered successfully'; 
    // });
    // builder.addCase(registerUser.rejected, (state, action) => {
    //   state.loading = false;
    //   state.error = action.payload as string || "User registration failed";
    // });

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
      //state.loading = true;
      //state.error = null;
    });
    builder.addCase(fetchUsers.fulfilled, (state, action) => {
      state.loading = false;
      state.users = action.payload.data.users.sort((a: any, b: any) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());;
      state.totalUsers = action.payload.data.totalUsers;
      state.totalPages = action.payload.data.totalPages;
      state.currentPage = action.payload.data.currentPage;
    });
    builder.addCase(fetchUsers.rejected, (state, action) => {
      state.loading = false;
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