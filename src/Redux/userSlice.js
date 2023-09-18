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
  },
});

export const { loginRedux } = userSlice.actions;
export default userSlice.reducer;