import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { publicAPI } from "../../utils/api";

interface LoginDatatype {
  loginID: string;
  password: string;
}
const loginThunk = createAsyncThunk(
  "user/login",
  async (data: LoginDatatype, thunkAPI) => {
    try {
      const resp = await publicAPI.post("/auth/login", {
        username: data.loginID,
        password: data.password,
      });

      return {
        accessToken: resp.data.accessToken,
        userType: resp.data.userType,
      };
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  }
);

const initialState = {
  accessToken: "",
  userType: "",
  loading: false,
  error: null,
};

const userSlice = createSlice({
  name: "UserSlice",
  initialState,
  reducers: {
    setAccessToken: (state, action) => {
      state.accessToken = action.payload.accessToken;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(loginThunk.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(loginThunk.fulfilled, (state, action) => {
        state.loading = false;
        state.accessToken = action.payload.accessToken;
        state.userType = action.payload.userType;
      })
      .addCase(loginThunk.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload || "Something went wrong";
      });
  },
});
export const { setAccessToken } = userSlice.actions;
export default userSlice.reducer;
