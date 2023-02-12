// interface PersonInfo{
//   height: number
//   weight:number
// }

export const CalculateBmi = (height: number, weight: number)=>{
  const bmi = weight / (height * height / 10000);
  if (bmi < 16.0) {
    return 'Underweight (Severe thinness)';
  } else if(bmi < 16.9){
    return 'Underweight (Moderate thinness)';
  } else if(bmi < 18.4){
    return 'Underweight (Mild thinness)';
  } else if(bmi < 24.9){
    return 'Normal range';
  } else if(bmi < 29.9){
    return 'Overweight (Pre-obese)';
  } else if(bmi < 34.9){
    return 'Obese (Class I)';
  } else if(bmi < 39.9){
    return 'Obese (Class II)';
  }else{
    return 'Obese (Class III)';
  }
};

// const parseArguments = (argv: Array<string>):PersonInfo => {
//   if (argv.length < 4) throw new Error('Not enough arguments');
//   if (argv.length > 4) throw new Error('Too many arguments');

//   if (!isNaN(Number(argv[2])) && !isNaN(Number(argv[3]))) {
//     return {
//       height: Number(argv[2]),
//       weight: Number(argv[3])
//     }
//   } else {
//     throw new Error('Provided values were not number');
//   }
  
// }

// const {height, weight} = parseArguments(process.argv)

// console.log(CalculateBmi(height, weight))

export default CalculateBmi;