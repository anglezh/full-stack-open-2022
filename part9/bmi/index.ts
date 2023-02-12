import express from 'express';
import {CalculateBmi } from './bmiCalculator';
import ExercisesCalculate, { parseArguments } from './exerciseCalculator';

const app = express();

app.use(express.json());

app.get('/bmi',(_req, res)=>{
  const height = _req.query.height;
  const weight = _req.query.weight;

  if (isNaN(Number(height)) || isNaN(Number(weight))) {
    return res.status(400).json({
      error: 'malformatted parameters'
    });
  }
  const bmi = CalculateBmi(Number(height), Number(weight));
  const response = {
    weight:weight,
    height:height,
    bmi:bmi
  };
  return res.json(response);
});

app.post('/exercises',(req, res) => {
  // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
  const {daily_exercises , target} = req.body;
  if (!daily_exercises || !target) {
    return res.status(400).json({
      error: "parameters missing"
    });
  }
  
  // eslint-disable-next-line @typescript-eslint/no-unsafe-argument
  if (parseArguments(daily_exercises, target)) {
    // eslint-disable-next-line @typescript-eslint/no-unsafe-argument
    const bmi = ExercisesCalculate(daily_exercises,target);
   return res.json(bmi);
  }
  return res.status(400).json({
    error: "malformatted parameters"
  });
});

const PORT = 3002;

app.listen(PORT,()=>{
  console.log(`server running on port ${PORT}`);
});