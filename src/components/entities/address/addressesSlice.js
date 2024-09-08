import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

const initialState = {
  registerAddress: null,
  tradingAddress: null,
  status: "idle",
  error: null,
};

export const fetchRegisterAddress = createAsyncThunk(
  "addresses/fetchRegisterAddress",
  async () => {
    const response = await fetch(`/entity/entity_id/register_address`);
    if (!response.ok) {
      throw new Error("Response was not ok");
    }
    const data = await response.json();
    return data;
  }
);

export const fetchTradingAddress = createAsyncThunk(
  "addresses/fetchTradingAddress",
  async () => {
    const response = await fetch(`/entity/entity_id/trading_address`);
    if (!response.ok) {
      throw new Error("Response was not ok");
    }
    const data = await response.json();
    return data;
  }
);

const addressesSlice = createSlice({
  name: "addresses",
  initialState,
  reducers: {
    resetAddresses: (state) => {
      state.status = "idle";
      (state.registerAddress = null),
        (state.tradingAddress = null),
        (state.error = null);
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchRegisterAddress.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchRegisterAddress.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.registerAddress = action.payload;
      })
      .addCase(fetchRegisterAddress.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message;
      })
      .addCase(fetchTradingAddress.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchTradingAddress.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.tradingAddress = action.payload;
      })
      .addCase(fetchTradingAddress.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message;
      });
  },
});
export const { resetAddresses } = addressesSlice.actions;
export default addressesSlice.reducer;
