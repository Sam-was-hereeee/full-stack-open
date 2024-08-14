const Header = (props) =>{
    return (
            <>
                <h1>{props.course}</h1>
            </>
        )

}

const Content = (props) => {
    return(
        <>
            <Part content={props.parts[0]}></Part>
            <Part content={props.parts[1]}></Part>
            <Part content={props.parts[2]}></Part>
        </>
    )
}

const Part = (props) =>{
    return (
        <>
        <p>
            {props.content.name} {props.content.exercises}
        </p>
        </>
    )
}

const Total = (props) => {
    return (
        <>
            <p>Number of exercises {props.parts.reduce((acc, {exercises})=>acc+exercises, 0)}</p>
        </>
    )
}

const App = ({counter}) => {
    const course = {
        name: 'Half Stack application development',
        parts: [
            {
                name: 'Fundamentals of React',
                exercises: 10
            },
            {
                name: 'Using props to pass data',
                exercises: 7
            },
            {
                name: 'State of a component',
                exercises: 14
            }
        ]
    }

    return (
        <div>
            <Header course={course.name}></Header>
            <Content parts={course.parts}></Content>
            <Total parts={course.parts}></Total>
            <p>Counter: {counter}</p>
        </div>
    )
}

export default App