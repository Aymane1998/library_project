import { combineReducers } from "@reduxjs/toolkit";
import getWordsSlice from "./wordSlices/getWordsSlice";


const wordReducer = combineReducers({
    getWords: getWordsSlice
})

export default wordReducer;