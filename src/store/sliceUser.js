import { createSlice } from '@reduxjs/toolkit';

const slice = createSlice({
  name: 'sliceUser',
  initialState: {
    image: null,
    username: null,
  },
  reducers: {
    setUsername(state, action) {
      state.username = action.payload;
    },
    setUserImg(state, action) {
      state.image = action.payload;
    },
  },
});

export const { setUsername, setUserImg } = slice.actions;
export const getUserFunc = (state) => state.user.username;
export const getUserImgFunc = (state) => state.user.image;

export default slice.reducer;
