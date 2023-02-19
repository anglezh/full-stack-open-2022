import { CoursePart } from "../type"
import { assertNever } from "../utils";

const Part = ({part}:{part: CoursePart}) =>{

    switch (part.type) {
      case 'normal':
        console.log(part.name,part.description, part.exerciseCount)
        return (
          <p>
            <li>
              <b>
                {part.name} {part.exerciseCount}
              </b>
            </li>
            <li>
              <i>{part.description}</i>
            </li>
          </p>
        );

      case 'groupProject':
        console.log(part.name,part.groupProjectCount, part.exerciseCount)
        return (
          <p>
            <li>
              <b>
                {part.name} {part.exerciseCount}
              </b>
            </li>
            <li>
            project exercises {part.groupProjectCount}
            </li>
          </p>
        );

      case 'submission':
        console.log(part.name,part.exerciseSubmissionLink, part.exerciseCount)
        return (
          <p>
            <li>
              <b>
              {part.name} {part.exerciseCount}
              </b>
            </li>
            <li>
              {part.description}
            </li>
            <li>
              submit to {part.exerciseSubmissionLink}
            </li>
          </p>
        )

        case 'special':
          return (
            <p>
              <b>{part.name} {part.exerciseCount}</b>
              <br />
              {part.description}
              <br />
              required skills: {part.requirements.join(', ')}
            </p>
          )
    
      default:
          return assertNever(part);
    }
}

export default Part