import {Gender, NewPatient} from './src/types'

const isString = (text: unknown): text is string =>{
  return typeof text === 'string' || text instanceof String 
}

const parseName = (name: unknown): string => {
  if (!name || !isString(name)) {
    throw new Error("incorrect or missing name: " + name);
  }
  return name
}

const isDate = (date: string): boolean =>{
  return Boolean(Date.parse(date))
}

const parseDateOfBirth = (birthday: unknown): string => {
  if (!isString(birthday)||!isDate(birthday)) {
    throw new Error("Incorrect or missing dateOfBirthday: " + birthday);
  }
  return birthday
}

const parseSsn = (ssn: unknown): string =>{
  if (!isString(ssn)) {
    throw new Error("Incorrect or missing ssn:" + ssn);
  }
  return ssn
}

const isGender = (param: any): param is Gender => {
  return Object.values(Gender).includes(param)
}

const parseGender = (gender: unknown): Gender =>{
  if (!gender || !isGender(gender)) {
    throw new Error("Incorrect or missing gender: " + gender);
  }
  return gender
}

const parseOccupation = (occupation: unknown): string =>{
  if (!isString(occupation) || ! occupation) {
    throw new Error("Incorrect or missing weather:" + occupation);
  }
  return occupation
}

const toNewPatientsEntry = (object: any):NewPatient => {
const newPatientEntry = {
  name: parseName(object.name),
  dateOfBirth: parseDateOfBirth(object.dateOfBirth),
  ssn: parseSsn(object.ssn),
  gender: parseGender(object.gender),
  occupation: parseOccupation(object.occupation)
}
return newPatientEntry
} 

export default toNewPatientsEntry;