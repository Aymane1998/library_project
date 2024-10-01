import { createAsyncThunk } from "@reduxjs/toolkit";
import { getWords } from "./wordAPI";



export const getWordsAsync = createAsyncThunk('words/getWords', async (word:string) => {
  const response = await getWords(word);

  return response;
});