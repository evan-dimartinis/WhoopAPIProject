import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

export const AuthSlice = createSlice({
  name: "Auth",
  initialState: {
    username: "",
    refresh_token: "",
    isAuthenticated: false,
    userid: 0
  },
  reducers: {
    getUserData: (state) => {
    },
  },
  extraReducers(builder) {
    builder
      .addCase(logInUser.fulfilled, (state, action) => {
        state.refresh_token = action.payload.refresh_token;
        state.username = action.payload.username;
        state.userid = action.payload.userid
        state.isAuthenticated = true
      })
      .addCase(validateRefreshToken.fulfilled, (state, action) => {
        state.refresh_token = action.payload.newtoken
      });
  },
});

export const validateRefreshToken = createAsyncThunk(
  "Auth/validateRefreshToken",
  async (cookierefreshtoken) => {
    const response = await fetch(`http://localhost:8080/validaterefreshtoken`, {
      method: "POST",
      mode: "cors",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ refreshtoken: cookierefreshtoken }),
    });
    const resdata = await response.json();
    return resdata;
  }
);

export const logInUser = createAsyncThunk(
  "Auth/logInUser",
  async (authdata) => {
    const response = await fetch(`http://localhost:8080/authenticateuser`, {
      method: "POST",
      mode: "cors",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(authdata),
    });
    const resdata = await response.json();
    return resdata;
  }
);
