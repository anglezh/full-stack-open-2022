import Header from "./Header/Header";
import Content from "./Content/Content";

function Total({ parts }) {
    const exercises = parts.map(value => value.exercises)
    const total = exercises.reduce((i, j) => {
        // console.log('what is happening', i, j)
        return i + j
    });
    return <p><b>Total of exercises {total}</b></p>
}
const Course = ({ course }) => {
    // console.log(course)
    return (
        <div>
            <Header name={course.name} />
            <Content parts={course.parts} />
            <Total parts={course.parts} />
        </div>
    )
}

export default Course