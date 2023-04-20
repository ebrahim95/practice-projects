
import axios from "axios";
import { Diagnosis } from "../types";
import { apiBaseUrl } from "../constants";

const getDiagnosis = async () => {
  const { data } = await axios.get<Diagnosis[]>(`${apiBaseUrl}/diagnoses`);
  return data
}

export default { getDiagnosis }
