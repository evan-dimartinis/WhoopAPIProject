import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

export const TomorrowTodosSlice = createSlice({
  name: "TomorrowTodos",
  initialState: {
    tmtodos: [],
  },
  reducers: {},
  extraReducers(builder) {
    builder
      .addCase(getTomorrowUserTodos.fulfilled, (state, action) => {
        state.tmtodos = action.payload;
      })
      .addCase(addNewTomorrowTodo.fulfilled, (state, action) => {
        state.tmtodos = action.payload;
      })
      .addCase(removeTomorrowTodo.fulfilled, (state, action) => {
        state.tmtodos = action.payload
      })
  },
});

export const getTomorrowUserTodos = createAsyncThunk(
  "TomorrowTodos/getTomorrowUserTodos",
  async (userid) => {
    const res = await fetch(
      `http://localhost:8080/gettomorrowtodos/userid/${userid}`,
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

export const addNewTomorrowTodo = createAsyncThunk(
  "TomorrowTodos/addNewTomorrowTodo",
  async (data) => {
    const res = await fetch(`http://localhost:8080/addtomorrowtodo`, {
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

export const removeTomorrowTodo = createAsyncThunk(
  "TomorrowTodos/removeTomorrowTodo",
  async (data) => {
    const res = await fetch(`http://localhost:8080/removetomorrowtodo`, {
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
)