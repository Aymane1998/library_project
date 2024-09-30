import { combineReducers } from "@reduxjs/toolkit";
import getCountriesSlice from "./countrySlices/getCountriesSlice";


const countryReducer = combineReducers({
    getCountries: getCountriesSlice
})

export default countryReducer;