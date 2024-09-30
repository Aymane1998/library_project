import { createAsyncThunk } from "@reduxjs/toolkit";
import { getCountries } from "./countryAPI";



export const getCountriesAsync = createAsyncThunk('countries/getCountries', async () => {
  const response = await getCountries();

  return response;
});