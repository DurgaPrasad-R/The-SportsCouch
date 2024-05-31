import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  user: null,
  isAuthenticated: false,
  theme: "light",
};

const AuthSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setUser(state, action) {
      state.user = action.payload;
      state.isAuthenticated = true;
    },
    removeUser(state) {
      state.user = null;
      state.isAuthenticated = false;
    },
    toggleTheme(state) {
      state.theme = state.theme === "light" ? "dark" : "light";
    },
  },
});

export const { setUser, removeUser, toggleTheme } = AuthSlice.actions;
export default AuthSlice.reducer;
