import { createSlice } from "@reduxjs/toolkit";
import { toast } from "react-toastify";
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
      localStorage.removeItem("auth-token");
      toast.success("Logged out successfully");
      setTimeout(() => {
        window.location.replace("/");
      }, 2000);
    },
    toggleTheme(state) {
      state.theme = state.theme === "light" ? "dark" : "light";
    },
  },
}); 

export const { setUser, removeUser, toggleTheme } = AuthSlice.actions;
export default AuthSlice.reducer;
