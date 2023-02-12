import express from 'express'
import patientService from '../services/patientService'
import toNewPatientsEntry from '../../utils'

const patientRouter = express.Router()

patientRouter.get('/',(_req, res)=>{
  res.send(patientService.getPatients())
})

patientRouter.post('/',(req,res)=>{
  try {
    const newPatientEntry =  toNewPatientsEntry(req.body)
    const newPatient = patientService.addPatient(newPatientEntry)
    res.send(newPatient)
  } catch (error) {
    let errorMessage = 'Something went wrong.'
    if (error instanceof Error) {
      errorMessage +='Error: ' + error.message
    }
     res.status(404).send(errorMessage)
  }
})

export default patientRouter
