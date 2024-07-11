import { useEffect, useState } from 'react'
import personsService from './services/persons'

import Filter from './components/Filter'
import PersonForm from './components/PersonForm'
import Persons from './components/Persons'
import Notification from './components/Notification'

const App = () => {
  const [persons, setPersons] = useState([])

  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [filter, setFilter] = useState('')
  const [message, setMessage] = useState(null)

  useEffect(() => {
    personsService.getAll()
      .then(initialPersons => setPersons(initialPersons))
  }, [])

  const validatePerson = (event) => {
    event.preventDefault()

    const existingPerson = persons.find(person => person.name === newName)

    if (existingPerson) {
      if (window.confirm(`${newName} is already added to phonebook, 
        replace the old number with a new one?`)) {
        updatePerson(existingPerson.id)
      } else {
        return
      }
    } else {
      addPerson()
    }
  }

  const addPerson = () => {
    const personObject = {
      name: newName,
      number: newNumber
    }

    personsService
      .create(personObject)
      .then(returnedPerson => {
        setPersons(persons.concat(returnedPerson))
        setNewName('')
        setNewNumber('')
        // Set a timeout to clear the message after 5 seconds
        setTimeout(() => {
          setMessage(null)
        }, 5000)
        setMessage({
          text: `Added ${returnedPerson.name}`,
          type: 'success'
        })
      })
      .catch(error => {
        console.log(error)
        setMessage({
          text: error.response.data.error,
          type: 'error'
        })
      })
  }

  const updatePerson = (id) => {
    const personObject = {
      name: newName,
      number: newNumber
    }

    personsService
      .update(id, personObject)
      .then(returnedPerson => {
        setPersons(persons.map(person => person.id !== id ? person : returnedPerson))
        setNewName('')
        setNewNumber('')
        // Set a timeout to clear the message after 5 seconds
        setTimeout(() => {
          setMessage(null)
        }, 5000)
        setMessage({
          text: `Changed ${returnedPerson.name}'s number`,
          type: 'success'
        })
      })
      .catch(error => {
        // Set a timeout to clear the message after 5 seconds
        setTimeout(() => {
          setMessage(null)
        }, 5000)
        setMessage({
          text: error.response.data.error,
          type: 'error'
        })
      })
  }

  const deletePerson = (id) => {
    const personName = persons.find(person => person.id === id).name
    if (!window.confirm(`Delete ${personName} ?`)) {
      return
    }

    personsService
      .deletePerson(id)
      .then(() => {
        setPersons(persons.filter(person => person.id !== id))
      })
  }

  return (
    <div>
      <h2>Phonebook</h2>
      <Notification message={message} />
      <Filter filter={filter} handleFilterChange={e => setFilter(e.target.value)} />
      <h3>Add a new</h3>
      <PersonForm
        newName={newName}
        newNumber={newNumber}
        handleNameChange={e => setNewName(e.target.value)}
        handleNumberChange={e => setNewNumber(e.target.value)}
        handleSubmit={validatePerson}
      />
      <h3>Numbers</h3>
      <Persons persons={persons} filter={filter} handleDelete={deletePerson} />
    </div>
  )
}

export default App
