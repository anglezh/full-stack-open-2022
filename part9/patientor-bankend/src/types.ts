export interface Diagnosis {
  code: string;
  name: string;
  latin?: string;
}

export interface Patient {
  id: string;
  name: string;
  dateOfBirth?: string;
  ssn?: string;
  gender: Gender;
  occupation: string;
  entries: Entry[];
}

export type NonSsnPatient = Omit<Patient, "ssn">;

export type NewPatient = Omit<Patient, "id">;

export type NonSensitivePatient = Omit<Patient, "ssn" | "entries">;

export enum Gender {
  Male = "male",
  Female = "female",
  Other = "other",
}

export enum Type {
  HealthCheck = "HealthCheck",
  OccupationalHealthcare = "OccupationalHealthcare",
  Hospital = "Hospital",
}

interface BaseEntry {
  id: string;
  description: string;
  date: string;
  specialist: string;
  diagnosisCodes?: Array<Diagnosis["code"]>;
}

export enum HealthCheckRating {
  "Healthy" = 0,
  "LowRisk" = 1,
  "HightRisk" = 2,
  "CriticalRisk" = 3,
}

interface HealthCheckEntry extends BaseEntry {
  type: Type;
  healthCheckRating: HealthCheckRating;
}

export interface sickLeave {
  startDate: string;
  endDate: string;
}

interface OccupationalHealthcareEntry extends BaseEntry {
  type: Type;
  employerName: string;
  sickLeave?: sickLeave;
}
export interface dischargeEntry {
  date: string;
  criteria: string;
}

interface HospitalEntry extends BaseEntry {
  type: Type;
  discharge: dischargeEntry;
}

export type Entry =
  | HealthCheckEntry
  | OccupationalHealthcareEntry
  | HospitalEntry;

// Define special omit for unions
type UnionOmit<T, K extends string | number | symbol> = T extends unknown
  ? Omit<T, K>
  : never;
// Define Entry without the 'id' property
export type EntryWithoutId = UnionOmit<Entry, "id">;
