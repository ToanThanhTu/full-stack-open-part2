import { useEffect, useState } from 'react'
import axios from 'axios'
import personsService from './services/persons'

import Filter from './components/Filter'
import PersonForm from './components/PersonForm'
import Persons from './components/Persons'

const App = () => {
  const [persons, setPersons] = useState([])

  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [filter, setFilter] = useState('')

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
