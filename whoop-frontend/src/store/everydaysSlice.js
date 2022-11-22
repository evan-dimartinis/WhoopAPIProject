import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

export const EverydaysSlice = createSlice({
  name: "Everydays",
  initialState: {
    everydays: [],
  },
  reducers: {},
  extraReducers(builder) {
    builder
      .addCase(getUserEverydays.fulfilled, (state, action) => {
        state.everydays = action.payload;
      })
      .addCase(addNewEveryday.fulfilled, (state, action) => {
        state.everydays = action.payload;
      })
      .addCase(markAsComplete.fulfilled, (state, action) => {
        state.everydays = action.payload
      });
  },
});

export const getUserEverydays = createAsyncThunk(
  "Everydays/getUserEverydays",
  async (userid) => {
    const res = await fetch(
      `http://localhost:8080/geteverydays/userid/${userid}`,
      {
        method: "GET",
        mode: "cors",
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
    const resdata = await res.json();
    return resdata;
  }
);

export const addNewEveryday = createAsyncThunk(
  "Everydays/addNewEveryday",
  async (everydaydata) => {
    //SHOULD RETURN THE UPDATED LIST OF EVERYDAYS
    const res = await fetch(
      `http://localhost:8080/addNewEveryday/userid/${everydaydata.userid}/sname/${everydaydata.sname}/dtend/${everydaydata.dtend}`,
      {
        method: "GET",
        mode: "cors",
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
    const resdata = await res.json();
    return resdata;
  }
);

export const markAsComplete = createAsyncThunk(
  "Everydays/markAsComplete",
  async (mydata) => {
    const res = await fetch('http://localhost:8080/markeverydayascomplete', {
      method: "POST",
      mode: "cors",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(mydata)
    })
    const resdata = await res.json()
    return resdata
  }
)
