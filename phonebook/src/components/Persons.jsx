import Person from "./Person"

const Persons = ({ persons, filter, handleDelete }) => {
    const personsToShow = persons.filter(person => {
        return person.name.toLowerCase().includes(filter.toLowerCase())
    })

    return (
        <div>
            {personsToShow.map(person => (
                <div key={person.id}>
                    <Person person={person} />
                    <button onClick={() => handleDelete(person.id)}>Delete</button>
                </div>
            ))}
        </div>
    )
}

export default Persons