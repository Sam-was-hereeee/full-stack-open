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
            <Part content={props.content[0]} exercise={props.exercise[0]}></Part>
            <Part content={props.content[1]} exercise={props.exercise[1]}></Part>
            <Part content={props.content[2]} exercise={props.exercise[2]}></Part>
        </>
    )
}

const Part = (props) =>{
    return (
        <>
        <p>
            {props.content} {props.exercise}
        </p>
        </>
    )
}

const Total = (props) => {
    return (
        <>
            <p>Number of exercises {props.total}</p>
        </>
    )
}

const App = () => {
    const course = 'Half Stack application development'
    const part1 = 'Fundamentals of React'
    const exercises1 = 10
    const part2 = 'Using props to pass data'
    const exercises2 = 7
    const part3 = 'State of a component'
    const exercises3 = 14
    const exercises = [exercises1, exercises2, exercises3]
    const parts = [part1, part2, part3]

    return (
        <div>
            <Header course={course}></Header>
            <Content content={parts} exercise={exercises}></Content>
            <Total total={exercises1+exercises2+exercises3}></Total>
        </div>
    )
}

export default App