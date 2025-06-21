const { createSlice, createAsyncThunk } = require("@reduxjs/toolkit");
import authService from "./authService";

const initialState = {
  userInfo:
    typeof window !== "undefined"
      ? JSON.parse(localStorage.getItem("User"))
      : null,
  isLoading: false,
  isSuccess: false,
  isError: false,
  message: "",
};

export const login = createAsyncThunk(
  "auth/login",
  async (formData, thunkAPI) => {
    try {
      return await authService.loginUser(formData);
    } catch (error) {
      const message = error.message;
      return thunkAPI.rejectWithValue(message);
    }
  }
);

export const register = createAsyncThunk(
  "auth/register",
  async (formData, thunkAPI) => {
    try {
      return await authService.registerUser(formData);
    } catch (error) {
      const message = error.message;
      return thunkAPI.rejectWithValue(message);
    }
  }
);

export const AuthSlice = createSlice({
  name: "Auth",
  initialState,
  reducers: {
    reset: (state) => {
      state.isLoading = false;
      state.isSuccess = false;
      state.isError = false;
      state.message = "";
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(login.pending, (state) => {
        state.isLoading = true;
        state.isError = false;
        state.isSuccess = false;
      })
      .addCase(login.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isError = false;
        state.isSuccess = true;
        state.userInfo = action.payload.user;
        state.message = action.payload.message;
      })
      .addCase(login.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.isSuccess = false;
        state.message = action.payload;
      })
      .addCase(register.pending, (state) => {
        state.isLoading = true;
        state.isError = false;
        state.isSuccess = false;
      })
      .addCase(register.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isError = false;
        state.isSuccess = true;
        state.userInfo = action.payload.user;
        state.message = action.payload.message;
      })
      .addCase(register.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.isSuccess = false;
        state.message = action.payload;
      });
  },
});

export const { reset } = AuthSlice.actions;
export default AuthSlice.reducer;
