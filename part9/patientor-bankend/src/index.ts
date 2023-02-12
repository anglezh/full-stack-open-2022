import express from 'express';
import diagnoseRouter from './routes/diagnosesRouter';
import patientRouter from './routes/patientRouter'
import cors from 'cors';

const app = express();
app.use(express.json());
app.use(cors());
app.use('/api/diagnose', diagnoseRouter)
app.use('/api/patients', patientRouter)

app.get('/api/ping',(_req, res)=>{
res.send('poooong');
})


const PORT =3001;
app.listen(PORT,()=>{
  console.log(`server running on port ${PORT}`);
})
