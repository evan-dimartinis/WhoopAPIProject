import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

export const JournalEntrySlice = createSlice({
  name: "JournalEntry",
  initialState: {
    bcompleted: false,
    stext: "",
  },
  reducers: {},
  extraReducers(builder) {
    builder.addCase(getJournalEntry.fulfilled, (state, action) => {
      state.stext = action.payload.stext.split('><!').join("'")
      state.bcompleted = action.payload.bcompleted;
    });
  },
});

export const getJournalEntry = createAsyncThunk(
  "JournalEntry/getJournalEntry",
  async (data) => {
    const res = await fetch(
      `http://localhost:8080/dailyentry/getjournalentry/userid/${data}`,
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

export const postJournalEntry = createAsyncThunk(
  "JournalEntry/postJournalEntry",
  async (data) => {
    const res = await fetch(
      `http://localhost:8080/dailyentry/postjournalentry`,
      {
        method: "POST",
        mode: "cors",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data)
      }
    );
  }
);
