import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import apiService from "../../../../services/service";

const initialState = {
  isLoading: false,
  success: false,
  error: null,
};

export const sendInvites = createAsyncThunk(
  "/user-management/users/invite",
  async (payload, thunkAPI) => {
    try {
      return await apiService("/user-management/users/invite", "POST", {
        payload,
      });
    } catch (e) {
      return thunkAPI.rejectWithValue(e.message);
    }
  }
);

export const getUserRoles = createAsyncThunk('inviteusers/getUserRoles', async (payload, thunkAPI) => {
  try {
    return await apiService('/user-management/users/user-roles', 'GET');
  } catch (e) {
    return thunkAPI.rejectWithValue(e.message)
  }
})
const inviteModalSlice = createSlice({
  name: "inviteusers",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(sendInvites.pending, (state) => {
        state.isLoading = true;
        state.success = false;
        state.error = null;
      })
      .addCase(sendInvites.fulfilled, (state, { payload }) => {
        state.isLoading = false;
        state.success = true;
        state.data = payload;
      })
      .addCase(sendInvites.rejected, (state, { payload }) => {
        state.isLoading = false;
        state.success = false;
        state.error = payload;
      })
      .addCase(getUserRoles.pending, (state) => {
        state.isLoding = true
      })
      .addCase(getUserRoles.fulfilled, (state, { payload }) => {
        state.isLoding = false;
        state.userroles = payload.data;

      })
      .addCase(getUserRoles.rejected, (state) => {
        state.isLoding = false
      })
  },
});

export default inviteModalSlice.reducer;
