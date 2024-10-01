import { createSlice } from '@reduxjs/toolkit';
import { ApiDataResponse } from '../../../utils/types/redux';
import { ReduxStatus } from '../../../utils/types/reduxStatusValues';
import { getWordsAsync } from '../wordAsync';
import { Word } from '../../../utils/types/Word';

const initialState: ApiDataResponse<Word[] | null> = {
  status: ReduxStatus.Idle,
  error: null,
  alert: {
    successMessage: '',
    errorMessage: '',
  },
  data: [],
};

const getWordsSlice = createSlice({
  name: 'getWord',
  initialState,
  reducers: {
    resetWordsRequest: () => initialState,
  },
  extraReducers: (builder) => {
    builder
      .addCase(getWordsAsync.pending, (state: { status: string }) => {
        state.status = ReduxStatus.Loading;
      })
      .addCase(getWordsAsync.fulfilled, (state, action) => {
        state.status = ReduxStatus.Succeeded;
        state.alert.successMessage = 'getWord successful';
        state.data = action.payload;
      })
      .addCase(getWordsAsync.rejected, (state, action) => {
        state.status = ReduxStatus.Failed;
        state.error = action.error.message;
        state.alert.errorMessage = 'getWord failed';
      });
  },
});

export const { resetWordsRequest } = getWordsSlice.actions;

export default getWordsSlice.reducer;
