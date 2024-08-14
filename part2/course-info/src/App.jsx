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

const App = () => {
    const courses = [
        {
            name: 'Half Stack application development',
            id: 1,
            parts: [
                {
                    name: 'Fundamentals of React',
                    exercises: 10,
                    id: 1
                },
                {
                    name: 'Using props to pass data',
                    exercises: 7,
                    id: 2
                },
                {
                    name: 'State of a component',
                    exercises: 14,
                    id: 3
                },
                {
                    name: 'Redux',
                    exercises: 11,
                    id: 4
                }
            ]
        },
        {
            name: 'Node.js',
            id: 2,
            parts: [
                {
                    name: 'Routing',
                    exercises: 3,
                    id: 1
                },
                {
                    name: 'Middlewares',
                    exercises: 7,
                    id: 2
                }
            ]
        }
    ]

    return (
        <div>
            {courses.map((course)=><Course course={course} key={course.id}/>)}
        </div>
    )
}

export default App