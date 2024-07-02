import Person from "./Person"

const Persons = ({ persons, filter }) => {
    const personsToShow = persons.filter(person => {
        return person.name.toLowerCase().includes(filter.toLowerCase())
    })

    return (
        <div>
            {personsToShow.map(person => (
                <Person key={person.id} person={person} />
            ))}
        </div>
    )
}

export default Persons