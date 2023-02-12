import diagnoseData from '../../data/diagnoses.json'
import { Diagnose } from '../types'

const getDiagnoseData = ():Diagnose[] =>{
  return diagnoseData
}

const addDiagnose = () =>{
  return null
}

export default {
  getDiagnoseData,
  addDiagnose
}