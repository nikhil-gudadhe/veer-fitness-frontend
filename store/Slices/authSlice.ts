import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axiosInstance from "../../helpers/axiosInstance.ts";
import { UserFormInputs } from "../../src/types/UserFormInputs.ts";

interface AuthState {
  isAuthenticated: boolean;
  user: UserFormInputs | null; // Authenticated user
  users: UserFormInputs[];      // List of users (for fetchAllUsers)
  totalUsers: number;
  totalPages: number;
  currentPage: number;
  loading: boolean;
  error: string | null;
}

const initialState: AuthState = {
  isAuthenticated: false,
  user: null,    // Holds currently authenticated user
  users: [],     // List of users fetched via fetchAllUsers
  totalUsers: 0,
  totalPages: 0,
  currentPage: 1,
  loading: false,
  error: null,};

// Register member
export const registerMember = createAsyncThunk("auth/registerMember", async (data: any, { rejectWithValue }) => {
  try {
    const response = await axiosInstance.post("/users/register", data);
    return response.data;
  } catch (error) {
    return rejectWithValue(error || 'Registration failed');
  }
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

export const fetchAllUsers = createAsyncThunk("users/fetchAllUsers", async ({ page, limit }: { page: number; limit: number }, { rejectWithValue }) => {
    try {
      const response = await axiosInstance.get(`/users/all-users`, {
        params: {
          page,
          limit,
        },
      });
      return response.data;
    } catch (error) {
      return rejectWithValue(error || "Failed to fetch users");
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
  },
  extraReducers: (builder) => {
    builder.addCase(registerMember.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(registerMember.fulfilled, (state, action) => {
      state.loading = false;
      state.isAuthenticated = true; 
      state.user = action.payload; 
    });
    builder.addCase(registerMember.rejected, (state, action) => {
      state.loading = false;
      state.error = action.payload as string || "Registration failed";
    });

    builder.addCase(loginUser.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(loginUser.fulfilled, (state, action) => {
      state.loading = false;
      state.isAuthenticated = true;
      state.user = action.payload;
      
      localStorage.setItem('accessToken', action.payload.accessToken);
      localStorage.setItem('refreshToken', action.payload.refreshToken);
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
      state.user = action.payload;
    });
    builder.addCase(getCurrentUser.rejected, (state) => {
      state.loading = false;
      state.isAuthenticated = false;
      state.user = null;
    });

    builder.addCase(fetchAllUsers.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(fetchAllUsers.fulfilled, (state, action) => {
      state.loading = false;
      state.users = action.payload.data.users;
      state.totalUsers = action.payload.data.totalUsers;
      state.totalPages = action.payload.data.totalPages;
      state.currentPage = action.payload.data.currentPage;
    });
    builder.addCase(fetchAllUsers.rejected, (state, action) => {
      state.loading = false;
      state.error = action.payload as string;
    });

    builder.addCase(logoutUser.fulfilled, (state) => {
      state.isAuthenticated = false;
      state.user = null;
      state.loading = false;
      state.error = null;
    });
  },
});

export const { logout } = authSlice.actions;

export default authSlice.reducer;
