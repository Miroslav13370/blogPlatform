import { createSlice } from '@reduxjs/toolkit';

const slice = createSlice({
  name: 'sliceListArtikle',
  initialState: {
    artikleList: [],
  },
  reducers: {
    addArtikle(state, action) {
      state.artikleList = action.payload;
    },
  },
});

export default slice.reducer;

export const { addArtikle } = slice.actions;
