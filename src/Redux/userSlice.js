import { createSlice } from "@reduxjs/toolkit";

// const initialState = {
//   user: {}, 
// };

export const userSlice = createSlice({
  name: "user",
  initialState: {
    value: {
      _id: '',
      firstName: '',
      lastName: '',
      email: '',
      image: '',
    }
  },
  reducers: {
    loginRedux: (state, action) => {
      state.value = action.payload
      console.log(action)
    },
    logoutRedux : (state, action) => {
      state.value = {
        _id: '',
        firstName: '',
        lastName: '',
        email: '',
        image: '',
      }
    }
  },
});

export const { loginRedux, logoutRedux } = userSlice.actions;
export default userSlice.reducer;