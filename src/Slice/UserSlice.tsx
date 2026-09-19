import { createSlice } from "@reduxjs/toolkit";
import { jwtDecode } from "jwt-decode";

const getInitialUser:any = () => {
  const token = localStorage.getItem('token');
  if (!token) return {};
  try {
    return jwtDecode(token);
  } catch (error) {
    return {};
  }
};

const userSlice = createSlice({
  name: 'user',
  initialState: getInitialUser(),
  reducers: {
    setUser: (_state, action) => action.payload,
    removeUser: () => ({})
  }
});

export const { removeUser, setUser } = userSlice.actions;
export default userSlice.reducer;