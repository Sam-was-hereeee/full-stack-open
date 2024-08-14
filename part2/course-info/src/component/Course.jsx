const Header = ({ text }) => <h1>{text}</h1>

const Total = ({ parts }) => <p><strong>Total of {parts.reduce((acc, el)=>acc+el.exercises,0)} exercises</strong></p>

const Part = ({ part }) =>
    <p>
        {part.name} {part.exercises}
    </p>

const Content = ({ parts }) =>
    <>
        {parts.map((part, i) => <Part key={part.id} part={part} />)}
        <Total parts={parts} />
    </>

const Course = ({ course }) => {

    return (
        <>
            <Header text={course.name} />
            <Content parts={course.parts} />
        </>
    )
}

export default Course;