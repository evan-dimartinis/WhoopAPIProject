import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

export const GoalsSlice = createSlice({
  name: "Goals",
  initialState: {
    goals: [],
  },
  reducers: {},
  extraReducers(builder) {
    builder.addCase(getUserGoals.fulfilled, (state, action) => {
      state.goals = action.payload;
    })
    .addCase(insertNewGoal.fulfilled, (state, action) => {
        state.goals = action.payload
        console.log(state)
    })
  },
});

export const getUserGoals = createAsyncThunk(
  "Goals/getUserGoals",
  async (userid) => {
    const res = await fetch(
      `http://localhost:8080/goals/getusergoals/userid/${userid}`,
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

export const insertNewGoal = createAsyncThunk(
  "Goals/insertNewGoal",
  async (data) => {
    const res = await fetch(`http://localhost:8080/goals/insertnewgoal`, {
      method: "POST",
      mode: "cors",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    });
    const resdata = await res.json()
    return resdata
  }
);
