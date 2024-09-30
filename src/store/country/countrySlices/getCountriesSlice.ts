import { createSlice } from '@reduxjs/toolkit';
import { ApiDataResponse } from '../../../utils/types/redux';
import { ReduxStatus } from '../../../utils/types/reduxStatusValues';
import { Country } from '../../../utils/types/Country';
import { getCountriesAsync } from '../countryAsync';

const initialState: ApiDataResponse<Country[] | null> = {
  status: ReduxStatus.Idle,
  error: null,
  alert: {
    successMessage: '',
    errorMessage: '',
  },
  data: [],
};

const getCountriesSlice = createSlice({
  name: 'getCountry',
  initialState,
  reducers: {
    resetCountriesRequest: () => initialState,
  },
  extraReducers: (builder) => {
    builder
      .addCase(getCountriesAsync.pending, (state: { status: string }) => {
        state.status = ReduxStatus.Loading;
      })
      .addCase(getCountriesAsync.fulfilled, (state, action) => {
        state.status = ReduxStatus.Succeeded;
        state.alert.successMessage = 'getCountry successful';
        state.data = action.payload;
      })
      .addCase(getCountriesAsync.rejected, (state, action) => {
        state.status = ReduxStatus.Failed;
        state.error = action.error.message;
        state.alert.errorMessage = 'getCountry failed';
      });
  },
});

export const { resetCountriesRequest } = getCountriesSlice.actions;

export default getCountriesSlice.reducer;
