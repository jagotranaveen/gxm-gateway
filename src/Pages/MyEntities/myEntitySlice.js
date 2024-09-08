import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import apiService from '../../services/service'

const initialState = {
  isLoding: false
};

export const getMyEntites = createAsyncThunk('myentities/getMyEntites', async (payload, thunkAPI) => {
  try {
    return await apiService('/entity/myentities/countries', 'GET');
  } catch (e) {
    return thunkAPI.rejectWithValue(e.message)
  }
})
export const fetchAllEntites = createAsyncThunk('myentities/fetchAllEntites', async (payload, thunkAPI) => {
  try {
    return await apiService('/entity/myentities/allentities', 'GET');
  } catch (e) {
    return thunkAPI.rejectWithValue(e.message)
  }
})
export const downloadReports = createAsyncThunk('myentities/downloadReports', async (payload, thunkAPI) => {
  try {
    return await apiService('/entity/myentities/download_report', 'GET');
  } catch (e) {
    return thunkAPI.rejectWithValue(e.message)
  }
})
export const lastMonthReports = createAsyncThunk('myentities/lastMonthReports', async (payload, thunkAPI) => {
  try {
    return await apiService('/entity/myentities/lastmonthReport', 'GET');
  } catch (e) {
    return thunkAPI.rejectWithValue(e.message)
  }
})
const myEntityReducer = createSlice({
  name: "myentities",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getMyEntites.pending, (state) => {
        state.isLoding = true
      })
      .addCase(getMyEntites.fulfilled, (state, { payload }) => {
        state.isLoding = false;
        state.myEntities = payload.data;

      })
      .addCase(getMyEntites.rejected, (state) => {
        state.isLoding = false
      })

      .addCase(fetchAllEntites.pending, (state) => {
        state.isLoding = true
      })
      .addCase(fetchAllEntites.fulfilled, (state, { payload }) => {
        console.log('payload payload --- >',payload.data)
        let uniqueCountries = [...new Set(payload?.data.map(entity => entity.country))];
        // let entitydatelist = [...new Set(payload?.data.map(entity => entity?.date_of_incorporation))];
        let entitydatelist =[]

        state.isLoding = false;
        state.allentites = payload.data;
        state.entitycountrylist = uniqueCountries;
        state.entitydatelist = entitydatelist;
      })
      .addCase(fetchAllEntites.rejected, (state) => {
        state.isLoding = false
      })
      .addCase(downloadReports.pending, (state) => {
        state.isLoding = true
      })
      .addCase(downloadReports.fulfilled, (state, { payload }) => {
        state.isLoding = false;
        window.open(payload.data)
      })
      .addCase(downloadReports.rejected, (state) => {
        state.isLoding = false
      })


      .addCase(lastMonthReports.pending, (state) => {
        state.isLoding = true
      })
      .addCase(lastMonthReports.fulfilled, (state, { payload }) => {
        state.isLoding = false;
        state.headcount = payload.data.headcount;
        state.detection_rate = payload.data.detection_rate;
        state.gross_cost = payload.data.gross_cost;
        state.accuracy_rate = payload.data.accuracy_rate;
      })
      .addCase(lastMonthReports.rejected, (state) => {
        state.isLoding = false
      })

  }
});

export default myEntityReducer.reducer;
