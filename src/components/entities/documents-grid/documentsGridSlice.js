import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

const initialState = {
  documents: null,
  status: "idle",
  error: null,
};

export const fetchDocuments = createAsyncThunk(
  "documents/fetchDocuments",
  async () => {
    const response = await fetch(`/documents`);
    if (!response.ok) {
      throw new Error("Failed to fetch documents");
    }
    const { data } = await response.json();
    return data;
  }
);

const documentsGridSlice = createSlice({
  name: "documents",
  initialState,
  reducers: {
    resetDocuments: (state) => {
      state.status = "idle";
      state.documents = null;
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchDocuments.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchDocuments.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.documents = action.payload;
      })
      .addCase(fetchDocuments.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message;
      });
  },
});

export const { resetDocuments } = documentsGridSlice.actions;
export default documentsGridSlice.reducer;
