import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface AuthState {
  user: {
    sid: string;
    sub: string;
    name: string;
    email: string;
    picture: string;
  } | null;
  isAuthenticated: boolean;
}

const initialState: AuthState = {
  user: null,
  isAuthenticated: false,
};

const AuthSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setUser: (state, action: PayloadAction<AuthState["user"]>) => {
      state.user = action.payload;
      state.isAuthenticated = !!action.payload;
    },
    clearUser: (state) => {
      state.user = null;
      state.isAuthenticated = false;
    },
  },
});

export const { setUser, clearUser } = AuthSlice.actions;
export default AuthSlice.reducer;
