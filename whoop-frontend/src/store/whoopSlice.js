import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

export const WhoopSlice = createSlice({
  name: "Whoop",
  initialState: {
    recovery: 0,
    strain: 0,
    minutesAsleep: 0,
    cycleid: 0
  },
  reducers: {},
  extraReducers(builder) {
    builder.addCase(getRecoveryData.fulfilled, (state, action) => {
        state.recovery = action.payload.recovery
        state.strain = action.payload.strain
        state.minutesAsleep = action.payload.minutesAsleep
        state.cycleid = action.payload.cycle_id
    })
  },
});

export const getRecoveryData = createAsyncThunk(
  "Whoop/getRecoveryData",
  async (userid) => {
    console.log(userid)
    const res = await fetch(
      `http://localhost:8080/gettodayswhoopdata/userid/${userid}`,
      {
        method: "GET",
        mode: "cors",
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
    const resdata = await res.json();
    console.log(resdata);
    return resdata;
  }
);
