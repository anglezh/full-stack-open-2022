import patientsData from "../../data/patients";
import {
  Entry,
  EntryWithoutId,
  NewPatient,
  NonSsnPatient,
  Patient,
} from "../types";
import { v4 as uuidv4 } from "uuid";

const getPatients = (): NonSsnPatient[] => {
  return patientsData;
};

const addPatient = (entry: NewPatient): Patient => {
  const newPatient = {
    ...entry,
    id: uuidv4(),
  };
  patientsData.push(newPatient);
  return newPatient;
};

const addDiagnose = (entry: EntryWithoutId, findPatiend: Patient): Entry => {
  const newDiagnoseEntry = {
    ...entry,
    id: uuidv4(),
  };
  findPatiend.entries.push(newDiagnoseEntry);
  return newDiagnoseEntry;
};

const findPatient = (id: string): Patient | null => {
  const patient = patientsData.find((p) => p.id === id);
  if (patient) {
    return patient;
  }
  return null;
};

export default {
  getPatients,
  addPatient,
  findPatient,
  addDiagnose,
};
