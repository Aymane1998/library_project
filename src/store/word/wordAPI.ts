import axios from "axios";
import { API_URL } from "../../config";
import { Word } from "../../utils/types/Word";

export const getWords = async (word: string): Promise<Word[]> => {
  const url = `${API_URL}/${word}`;

  const response = await axios.get<Word[]>(url);

  return response.data;
};