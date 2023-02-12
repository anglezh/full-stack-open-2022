import patientsData from '../../data/patients'
import {NewPatient, NonSsnPatient, Patient} from '../types'
import {v4 as uuidv4} from 'uuid'


const getPatients = ():NonSsnPatient[] =>{
  return patientsData
}

const addPatient = (entry: NewPatient):Patient => {
  const newPatient = {
    ...entry,
    id: uuidv4()
  }
  patientsData.push(newPatient)
  return newPatient
}
export default {
  getPatients,
  addPatient
}