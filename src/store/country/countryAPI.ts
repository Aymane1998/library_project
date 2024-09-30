import axios from "axios";
import { API_URL } from "../../config";
import { Country } from "../../utils/types/Country";

export const getCountries = async (): Promise<Country[]> => {
  const url = `${API_URL}/all`;

  const response = await axios.get<Country[]>(url);

  return response.data;
};