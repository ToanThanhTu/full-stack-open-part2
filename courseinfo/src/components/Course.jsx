const Header = ({ course }) => <h2>{course}</h2>

const Part = ({ part }) =>
    <p>
        {part.name} {part.exercises}
    </p>

const Content = ({ parts }) => {
    return (
        <>
            {parts.map(part => <Part key={part.id} part={part} />)}
        </>
    )
}

const Total = ({ sum }) => <p><b>total number of {sum} exercises</b></p>

const Course = ({ course }) => {
    const { id, name, parts } = course
    const total = parts.reduce((acc, part) => acc + part.exercises, 0)

    return (
        <>
            <Header course={name} />
            <Content parts={parts} />
            <Total sum={total} />
        </>
    )
}

export default Course