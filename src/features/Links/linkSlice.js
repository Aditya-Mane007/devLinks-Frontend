import { TabSlice } from "../tab/tabSlice";
import { createLinks, deleteLinks, fetchLinks } from "./linkService";

const { createSlice, createAsyncThunk } = require("@reduxjs/toolkit");

const initialState = {
  links: [],
  isLoading: false,
  isSuccess: false,
  isError: false,
  message: "",
};

export const getLinks = createAsyncThunk("link/getLinks", async (thunkAPI) => {
  try {
    return await fetchLinks();
  } catch (error) {
    const message = error.message || error.toString();

    return thunkAPI.rejectWithValue(message);
  }
});

export const createLink = createAsyncThunk(
  "link/createLink",
  async (formData, thunkAPI) => {
    try {
      return await createLinks(formData);
    } catch (error) {
      const message = error.message || error.toString();

      return thunkAPI.rejectWithValue(message);
    }
  }
);

export const deleteLink = createAsyncThunk(
  "link/deleteLink",
  async (id, thunkAPI) => {
    try {
      return await deleteLinks(id);
    } catch (error) {
      const message = error.message || error.toString();

      return thunkAPI.rejectWithValue(message);
    }
  }
);

export const LinkSlice = createSlice({
  name: "Links",
  initialState,
  reducers: {
    reset: (state) => {
      state.isLoading = false;
      state.isSuccess = false;
      state.isError = false;
      state.message = false;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(getLinks.pending, (state) => {
        state.isLoading = true;
        state.isError = false;
        state.isSuccess = false;
        state.message = false;
      })
      .addCase(getLinks.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isError = false;
        state.isSuccess = true;
        state.links = action.payload.links;
        state.message = action.payload.message;
      })
      .addCase(getLinks.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.isSuccess = false;
        state.message = action.payload.message;
      })
      .addCase(deleteLink.pending, (state) => {
        state.isLoading = true;
        state.isError = false;
        state.isSuccess = false;
        state.message = false;
      })
      .addCase(deleteLink.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isError = false;
        state.isSuccess = true;
        state.links = state.links.filter(
          (link) => link._id !== action.payload.id
        );
        state.message = action.payload.message;
      })
      .addCase(deleteLink.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.isSuccess = false;
        state.message = action.payload.message;
      });
  },
});

export const { reset } = LinkSlice.actions;

export default LinkSlice.reducer;
