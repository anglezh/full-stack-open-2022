import express from 'express';
// import { getDiagnoseData } from '../services/diagnoseService';

import diagnoseService from '../services/diagnoseService'

const diagnoseRouter = express.Router();

diagnoseRouter.get('/',(_req, res)=>{
 res.send(diagnoseService.getDiagnoseData());
});

export default diagnoseRouter