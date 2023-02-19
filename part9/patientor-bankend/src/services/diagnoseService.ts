import diagnoseData from '../../data/diagnoses.json'
import { Diagnosis } from '../types'

const getDiagnoseData = ():Diagnosis[] =>{
  return diagnoseData
}

const addDiagnose = () =>{
  return null
}

export default {
  getDiagnoseData,
  addDiagnose
}