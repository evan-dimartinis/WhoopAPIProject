import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

export const DailyJournalSlice = createSlice({
  name: "DailyJournal",
  initialState: {
    completed: false,
    result: {
      dtofentry: new Date(new Date() - new Date().getTimezoneOffset() * 60000)
        .toISOString()
        .split("T")[0],
      balcohol: false,
      bmarijuana: false,
      irecovery: 0,
      dstrain: 0,
      iminutesofsleep: 0,
      bwfh: false,
      bsocial: false,
      imentalwellness: 1,
      iproductivity: 1,
      bworkout: false,
      iworkouttype: 1,
      btraveling: false,
      iwhoopcycleid: 0,
    },
  },
  reducers: {},
  extraReducers(builder) {
    builder
      .addCase(getUserJournal.fulfilled, (state, action) => {
        if (action.payload.completed) {
          state.completed = action.payload.completed;
          state.result.dtofentry = new Date(action.payload.result.dtofentry)
            .toISOString()
            .split('T')[0];
          state.result.balcohol = action.payload.result.balcohol;
          state.result.bmarijuana = action.payload.result.bmarijuana;
          state.result.irecovery = action.payload.result.irecovery;
          state.result.dstrain = action.payload.result.dstrain;
          state.result.iminutesofsleep = action.payload.result.iminutesofsleep;
          state.result.bwfh = action.payload.result.bwfh;
          state.result.bsocial = action.payload.result.bsocial;
          state.result.imentalwellness = action.payload.result.imentalwellness;
          state.result.iproductivity = action.payload.result.iproductivity;
          state.result.bworkout = action.payload.result.bworkout;
          state.result.iworkouttype = action.payload.result.iworkouttype;
          state.result.btraveling = action.payload.result.btraveling;
          state.result.iwhoopcycleid = action.payload.result.iwhoopcycleid;
        } else {
          state.completed = false;
          state.result = {
            dtofentry: action.payload,
            balcohol: false,
            bmarijuana: false,
            irecovery: 0,
            dstrain: 0,
            iminutesofsleep: 0,
            bwfh: false,
            bsocial: false,
            imentalwellness: 1,
            iproductivity: 1,
            bworkout: false,
            iworkouttype: 1,
            btraveling: false,
            iwhoopcycleid: 0,
          };
        }
      })
      .addCase(insertUserJournal.fulfilled, (state, action) => {
        state.completed = true;
      });
  },
});

export const getUserJournal = createAsyncThunk(
  "DailyJournal/getUserJournal",
  async (data) => {
    const res = await fetch(
      `http://localhost:8080/dailyentry/getdailyentry/userid/${data.userid}/daysprior/${data.daysprior}`,
      {
        method: "GET",
        mode: "cors",
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
    const resdata = await res.json();
    if (resdata.completed) {
      return resdata
    } else {
      const x = new Date((new Date() - new Date().getTimezoneOffset() * 60000) - (data.daysprior * (1000 * 60 * 60 * 24))).toISOString().split('T')[0]
      return x
    }
  }
);

export const insertUserJournal = createAsyncThunk(
  "DailyJournal/insertUserJournal",
  async (data) => {
    const res = await fetch(`http://localhost:8080/daiyentry/insertdailyentry`, {
      method: "POST",
      mode: "cors",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    });
    const resdata = await res.json();
    return resdata;
  }
);

export const updateUserJournal = createAsyncThunk(
  "DailyJournal/updateUserJournal",
  async (data) => {
    const res = await fetch(`http://localhost:8080/dailyentry/updatedailyentry`, {
      method: "POST",
      mode: "cors",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    });
    const resdata = await res.json();
    return resdata;
  }
);
