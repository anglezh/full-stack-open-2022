import {
  Diagnosis,
  dischargeEntry,
  EntryWithoutId,
  Gender,
  HealthCheckRating,
  NewPatient,
  Type,
} from "./src/types";

const isString = (text: unknown): text is string => {
  return typeof text === "string" || text instanceof String;
};

const parseName = (name: unknown): string => {
  if (!name || !isString(name)) {
    throw new Error("incorrect or missing name: " + name);
  }
  return name;
};

const isDate = (date: string): boolean => {
  return Boolean(Date.parse(date));
};

const parseDateOfBirth = (birthday: unknown): string => {
  if (!isString(birthday) || !isDate(birthday)) {
    throw new Error("Incorrect or missing dateOfBirthday: " + birthday);
  }
  return birthday;
};

const parseSsn = (ssn: unknown): string => {
  if (!isString(ssn)) {
    throw new Error("Incorrect or missing ssn:" + ssn);
  }
  return ssn;
};

const isGender = (param: any): param is Gender => {
  return Object.values(Gender).includes(param);
};

const parseGender = (gender: unknown): Gender => {
  if (!isGender(gender)) {
    throw new Error("Incorrect or missing gender: " + gender);
  }
  return gender;
};

const parseOccupation = (occupation: unknown): string => {
  if (!isString(occupation) || !occupation) {
    throw new Error("Incorrect or missing weather:" + occupation);
  }
  return occupation;
};
const parseEntries = (entries: any): [] => {
  if (!entries) {
    return [];
  } else {
    return entries;
  }
};

const toNewPatientsEntry = (object: any): NewPatient => {
  const newPatientEntry = {
    name: parseName(object.name),
    dateOfBirth: parseDateOfBirth(object.dateOfBirth),
    ssn: parseSsn(object.ssn),
    gender: parseGender(object.gender),
    occupation: parseOccupation(object.occupation),
    entries: parseEntries(object.entries),
  };
  return newPatientEntry;
};

const parseDescription = (description: unknown): string => {
  if (!description || !isString(description)) {
    throw new Error("InCorrecrt or missing description:" + description);
  }
  return description;
};

const parseDateOfDiagnose = (date: unknown): string => {
  if (!isString(date) || !isDate(date)) {
    throw new Error("Incorrect or miss date:" + date);
  }
  return date;
};

const parseSpecialist = (specialist: unknown): string => {
  if (!specialist || !isString(specialist)) {
    throw new Error("Incorrect or miss specialist:" + specialist);
  }
  return specialist;
};

const isHealthCheck = (param: any): param is HealthCheckRating => {
  return Object.values(HealthCheckRating).includes(param);
};

const parseHealthCheck = (rating: unknown): HealthCheckRating => {
  if (!rating || !isHealthCheck(rating)) {
    throw new Error("Incorrect or miss HealthCheck Rating:" + rating);
  }
  return rating;
};

const parseDiagnosisCodes = (object: unknown): Array<Diagnosis["code"]> => {
  if (!object || typeof object !== "object" || !("diagnosisCodes" in object)) {
    return [] as Array<Diagnosis["code"]>;
  }
  return object.diagnosisCodes as Array<Diagnosis["code"]>;
};

const parseDischarge = (object: unknown): dischargeEntry => {
  if (!object || typeof object !== "object" || !("discharge" in object)) {
    throw new Error("Incorrect or miss discharge: " + object);
  }
  return object.discharge as dischargeEntry;
};

const parseEmployerName = (employer: unknown): string => {
  if (!employer || !isString(employer)) {
    throw new Error("Incorrect or miss employerName:" + employer);
  }
  return employer;
};

const isType = (param: string): param is Type => {
  return Object.values(Type)
    .map((v) => v.toString())
    .includes(param);
};

const parseType = (type: any): Type => {
  if (!isString(type) || !isType(type)) {
    throw new Error("Incorrect or miss type:" + type);
  }
  return type;
};
export const toNewDiagnoseEntry = (object: any): EntryWithoutId => {
  switch (parseType(object.type)) {
    case Type.HealthCheck:
      const newDiagnoseEntry = {
        description: parseDescription(object.description),
        date: parseDateOfDiagnose(object.date),
        specialist: parseSpecialist(object.specialist),
        healthCheckRating: parseHealthCheck(object.healthCheckRating),
        diagnosisCodes: parseDiagnosisCodes(object),
        type: parseType(object.type),
      };
      console.log(newDiagnoseEntry);
      return newDiagnoseEntry;
    case Type.OccupationalHealthcare:
      const newOccupationalHealthcareEntry = {
        description: parseDescription(object.description),
        date: parseDateOfDiagnose(object.date),
        specialist: parseSpecialist(object.specialist),
        diagnosisCodes: parseDiagnosisCodes(object),
        employerName: parseEmployerName(object.employerName),
        sickLeave: object.sickLeave,
        type: parseType(object.type),
      };
      return newOccupationalHealthcareEntry;
    default:
      const newHospitalEntry = {
        description: parseDescription(object.description),
        date: parseDateOfDiagnose(object.date),
        specialist: parseSpecialist(object.specialist),
        diagnosisCodes: parseDiagnosisCodes(object),
        discharge: parseDischarge(object),
        type: parseType(object.type),
      };
      return newHospitalEntry;
  }
};

export default toNewPatientsEntry;
