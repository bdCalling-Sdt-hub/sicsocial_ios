// features/token/tokenSlice.js
import { createSlice } from '@reduxjs/toolkit';

const userSlice = createSlice({
  name: 'user',
  initialState: {
    token: null,
    role: null,
  },
  reducers: {
    setToken(state, action) {
      state.token = action.payload;
    },
    clearToken(state) {
      state.token = null;
    },
    setUserRole : (state, action) =>{
      state.role = action.payload;
    },
    clearUserRole(state) {
      state.role = null;
    },
  },
});

export const { setToken, clearToken,clearUserRole,setUserRole } = userSlice.actions;
export default userSlice.reducer;
