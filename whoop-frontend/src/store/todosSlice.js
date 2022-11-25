import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

export const TodosSlice = createSlice({
  name: "Todos",
  initialState: {
    todos: [],
  },
  reducers: {},
  extraReducers(builder) {
    builder
      .addCase(getUserTodos.fulfilled, (state, action) => {
        state.todos = action.payload;
      })
      .addCase(addNewTodo.fulfilled, (state, action) => {
        state.todos = action.payload;
      })
      .addCase(markAsComplete.fulfilled, (state, action) => {
        state.todos = action.payload
      })
      .addCase(removeTodo.fulfilled, (state, action) => {
        state.todos = action.payload
      })
  },
});

export const getUserTodos = createAsyncThunk(
  "Todos/getUserTodos",
  async (userid) => {
    const res = await fetch(`http://localhost:8080/todos/gettodos/userid/${userid}`, {
      method: "GET",
      mode: "cors",
      headers: {
        "Content-Type": "application/json",
      },
    });
    const resdata = await res.json();
    return resdata;
  }
);

export const addNewTodo = createAsyncThunk("Todos/addNewTodo", async (data) => {
  const res = await fetch(`http://localhost:8080/todos/addnewtodo`, {
    method: "POST",
    mode: "cors",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  });
  const resdata = await res.json();
  return resdata;
});

export const markAsComplete = createAsyncThunk(
  "Todos/markAsComplete",
  async (data) => {
    const res = await fetch(`http://localhost:8080/todos/marktodoascomplete`, {
      method: "POST",
      mode: "cors",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data)
    })
    const resdata = await res.json()
    return resdata
  }
)

export const removeTodo = createAsyncThunk(
  "Todos/removeTodo",
  async (data) => {
    const res = await fetch(`http://localhost:8080/todos/removetodoitem`, {
      method: "POST",
      mode: "cors",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data)
    })
    const resdata = await res.json()
    return resdata
  }
)