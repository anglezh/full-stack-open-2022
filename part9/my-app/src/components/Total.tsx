import {CoursePart} from '../type'

interface TotalProps {
courseParts: Array<CoursePart>
}

const Total = (props: TotalProps) => {
return (
  <div>
    <p>
      Number of exercises{" "}
      {props.courseParts.reduce((carry, part) => carry + part.exerciseCount, 0)}
    </p>
  </div>
)
}

export default Total