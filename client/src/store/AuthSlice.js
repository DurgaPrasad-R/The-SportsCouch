import { createSlice } from "@reduxjs/toolkit";
import { toast } from "react-toastify";
const initialState = {
  user: null,
  isAuthenticated: false,
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
  },
});

export const { setUser, removeUser } = AuthSlice.actions;
export default AuthSlice.reducer;
