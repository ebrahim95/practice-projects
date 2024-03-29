import axios from "axios";
import { Entry, EntryWithoutId, Patient, PatientFormValues } from "../types";

import { apiBaseUrl } from "../constants";

const getAll = async () => {
  const { data } = await axios.get<Patient[]>(
    `${apiBaseUrl}/patients`
  );

  return data;
};

const create = async (object: PatientFormValues) => {
  const { data } = await axios.post<Patient>(
    `${apiBaseUrl}/patients`,
    object
  );

  return data;
};

const getSingle = async (id: string) => {
  const { data } = await axios.get<Patient>(`${apiBaseUrl}/patients/${id}`);
  return data;
}

const create_entry = async (id: string, obj: EntryWithoutId) => {
  const { data } = await axios.post<Entry>(`${apiBaseUrl}/patients/${id}/entries`, obj)
  return data;
}


// eslint-disable-next-line import/no-anonymous-default-export
export default {
  getAll, create, getSingle, create_entry
};

