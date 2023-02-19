import express from "express";
import patientService from "../services/patientService";
import toNewPatientsEntry, { toNewDiagnoseEntry } from "../../utils";

const patientRouter = express.Router();

patientRouter.get("/", (_req, res) => {
  res.send(patientService.getPatients());
});

patientRouter.get("/:id", (req, res) => {
  const findPatiend = patientService.findPatient(req.params.id);
  res.send(findPatiend);
});

patientRouter.post("/", (req, res) => {
  try {
    const newPatientEntry = toNewPatientsEntry(req.body);
    const newPatient = patientService.addPatient(newPatientEntry);
    res.send(newPatient);
  } catch (error) {
    let errorMessage = "Something went wrong.";
    if (error instanceof Error) {
      errorMessage += "Error: " + error.message;
    }
    res.status(404).send(errorMessage);
  }
});

patientRouter.post("/:id/entries", (req, res) => {
  try {
    const findPatiend = patientService.findPatient(req.params.id);
    if (findPatiend) {
      const newDiagnoseEntry = toNewDiagnoseEntry(req.body);
      const newDiagnose = patientService.addDiagnose(
        newDiagnoseEntry,
        findPatiend
      );
      console.log(newDiagnoseEntry);
      res.send(newDiagnose);
    }
  } catch (error) {
    let errorMessage = "Something went wrong.";
    if (error instanceof Error) {
      errorMessage += "Error: " + error.message;
    }
    res.status(404).send(errorMessage);
  }
});

export default patientRouter;
