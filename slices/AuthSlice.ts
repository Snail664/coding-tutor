import apiClient from "@/lib/APIClient";
import { RootState } from "@/store";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { createAsyncThunk } from "@reduxjs/toolkit";

interface AuthState {
  user: {
    sid: string;
    sub: string;
    name: string;
    email: string;
    picture: string;
    isWalkthroughEnabled: boolean;
  } | null;
  isAuthenticated: boolean;
  isLoading: boolean;
}

const initialState: AuthState = {
  user: null,
  isAuthenticated: false,
  isLoading: false,
};

export const disableWalkthroughThunk = createAsyncThunk<
  { isWalkthroughEnabled: boolean },
  void,
  { state: RootState }
>("auth/disableWalkthrough", async (_, { rejectWithValue, dispatch }) => {
  try {
    const response = await apiClient.post("/user/walkthrough", {
      isWalkthroughEnabled: false,
    });
    // Update the state immediately with the response data
    return response.data;
  } catch (error: any) {
    console.error("Error in disableWalkthroughThunk:", error);
    return rejectWithValue(error.message || "Unknown error occurred");
  }
});

export const fetchUserDataThunk = createAsyncThunk<
  AuthState["user"],
  void,
  { state: RootState }
>("auth/fetchUserData", async (_, { rejectWithValue }) => {
  try {
    const response = await apiClient.get("/user/me");
    const userData = response.data;
    return {
      sid: userData.auth0_sid,
      sub: userData.auth0_sub,
      name: userData.auth0_name ?? "",
      email: userData.auth0_email ?? "",
      picture: userData.auth0_picture ?? "",
      isWalkthroughEnabled: userData.isWalkthroughEnabled,
    };
  } catch (error: any) {
    console.error("Error in fetchUserDataThunk:", error);
    return rejectWithValue(error.message || "Unknown error occurred");
  }
});

export const enableWalkthroughThunk = createAsyncThunk<
  { isWalkthroughEnabled: boolean },
  void,
  { state: RootState }
>("auth/enableWalkthrough", async (_, { rejectWithValue, dispatch }) => {
  try {
    const response = await apiClient.post("/user/walkthrough", {
      isWalkthroughEnabled: true,
    });
    // Update the state immediately with the response data
    return response.data;
  } catch (error: any) {
    console.error("Error in enableWalkthroughThunk:", error);
    return rejectWithValue(error.message || "Unknown error occurred");
  }
});

const AuthSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setUser: (state, action: PayloadAction<AuthState["user"]>) => {
      state.user = action.payload;
      state.isAuthenticated = !!action.payload;
      state.isLoading = false;
    },
    clearUser: (state) => {
      state.user = null;
      state.isAuthenticated = false;
      state.isLoading = false;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchUserDataThunk.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(fetchUserDataThunk.fulfilled, (state, action) => {
        state.user = action.payload;
        state.isAuthenticated = true;
        state.isLoading = false;
      })
      .addCase(fetchUserDataThunk.rejected, (state) => {
        state.user = null;
        state.isAuthenticated = false;
        state.isLoading = false;
      })
      .addCase(disableWalkthroughThunk.fulfilled, (state, action) => {
        if (state.user) {
          state.user.isWalkthroughEnabled = action.payload.isWalkthroughEnabled;
        }
      })
      .addCase(enableWalkthroughThunk.fulfilled, (state, action) => {
        if (state.user) {
          state.user.isWalkthroughEnabled = action.payload.isWalkthroughEnabled;
        }
      });
  },
});

export const { setUser, clearUser } = AuthSlice.actions;
export default AuthSlice.reducer;
