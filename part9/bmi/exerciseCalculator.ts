interface ExercisesValues{ 
  periodLength: number
  trainingDays: number
  success: boolean
  rating: number
  ratingDescription: string
  target: number
  average: number }

export const parseArguments =(exer:Array<number>, target:number): boolean=>{

  const res = exer.every(function(element) {return typeof element === 'number';});
  if (typeof(target) === 'number' && res) {
    return true;
  }else{
    return false;
  }
};

const ExercisesCalculate = (exercisesData:Array<number>, target: number): ExercisesValues =>{

  const training = exercisesData.filter(t=> t !== 0 );
  const average = exercisesData.reduce((a,b)=> a+b,0) / exercisesData.length;
  const success = average >= target;
  let rating = 0;
  let ratingDescription = '';
  if (average < 1.5) {
    ratingDescription = 'it\'s so bad';
    rating = 1;
  } else if(average < 2){
    ratingDescription = 'not too bad but could be better';
    rating = 2;
  }else if(average >=2){
    ratingDescription = 'so good';
    rating = 3;
  }
  return { periodLength: exercisesData.length,
    trainingDays: training.length,
    success: success,
    rating: rating,
    ratingDescription:ratingDescription,
    target: target,
    average: average };
};

export default ExercisesCalculate;