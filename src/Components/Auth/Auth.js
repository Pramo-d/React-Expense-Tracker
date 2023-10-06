import { createSlice } from "@reduxjs/toolkit";

const initialToken = localStorage.getItem("idToken");

const initialAuthState = {
  idToken: initialToken,
  isAuthenticated: !!initialToken,
};

const authSlice = createSlice({
  name: "auth",
  initialState: initialAuthState,
  reducers: {
    login(state, action) {
      state.idToken = action.payload;
      state.isAuthenticated = true;
    },
    logout(state, action) {
      state.idToken = action.payload;
      state.isAuthenticated = false;
    },
  },
});
export const authAction = authSlice.actions;
export default authSlice.reducer;
