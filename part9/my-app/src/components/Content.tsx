import { CoursePart } from "../type"
import Part from "./Part"

interface ContentProps {
  courseParts: Array<CoursePart>
}

const Content = (props: ContentProps) => {
return (
  <>
  {
    props.courseParts.map(a=>(
      <Part key={a.name} part={a} />
    ))
  }
  </>
)
}

export default Content