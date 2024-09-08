import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

const initialState = {
  hspContact: null,
  customerContact: null,
  status: "idle",
  error: null,
};

export const fetchHspContact = createAsyncThunk(
  "contactList/fetchHspContact",
  async () => {
    const response = await fetch(`/entity/entity_id/hsp_contact`);
    if (!response.ok) {
      throw new Error("Response was not ok");
    }
    const data = await response.json();
    return data;
  }
);

export const fetchCustomerContact = createAsyncThunk(
  "contactList/fetchCustomerContact",
  async () => {
    const response = await fetch(`/entity/entity_id/customer_contact`);
    if (!response.ok) {
      throw new Error("Response was not ok");
    }
    const data = await response.json();
    return data;
  }
);

const contactListSlice = createSlice({
  name: "contactList",
  initialState,
  reducers: {
    resetContactList: (state) => {
      state.status = "idle";
      (state.hspContact = null),
        (state.customerContact = null),
        (state.error = null);
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchHspContact.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchHspContact.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.hspContact = action.payload;
      })
      .addCase(fetchHspContact.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message;
      })
      .addCase(fetchCustomerContact.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchCustomerContact.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.customerContact = action.payload;
      })
      .addCase(fetchCustomerContact.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message;
      });
  },
});
export const { resetContactList } = contactListSlice.actions;
export default contactListSlice.reducer;
