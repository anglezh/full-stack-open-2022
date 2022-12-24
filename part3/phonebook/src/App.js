import { useState, useEffect } from 'react'
import personService from './services/person'
import PersonForm from './components/PersonForm'
import Filter from './components/Filter'
import Notification from './components/Notification'
import Persons from './components/Persons'

const App = () => {
  var [persons, setPersons] = useState([])
  const [newName, setNewName] = useState('')
  const [number, setNumber] = useState('')
  const [filter, setFilter] = useState('')
  const personToShow = filter.length > 0 ? persons.filter(person => person['name'].toLowerCase().includes(filter.toLowerCase())) : persons
  const [message, setMessage] = useState(null)
  const [isSuccess, setIsSuccess] = useState(null)
  const handleName = (event) => {
    setNewName(event.target.value)
  }
  const handleNumber = (event) => {
    setNumber(event.target.value)
  }

  const ShowMessage = (message, isGreenYes, ms) => {
    setMessage(message)
    setIsSuccess(isGreenYes)
    setTimeout(() => {
      setMessage(null)
      setIsSuccess(null)
    }, ms);
  }

  useEffect(() => {
    personService
      .getAll()
      .then(initialPersons => {
        setPersons(initialPersons)
      })
  }, [])


  const deletePerson = (person) => {
    const id = person.id
    const name = person.name
    if (window.confirm(`Delete Arto ${name}`)) {
      console.log(`delete ${id}`)
      personService
        .remove(id)
        .then(responseStatus => {
          if (responseStatus === 204) {
            setPersons(persons.filter(person => person.id !== id))
          }
        })
    }
  }
  const addPerson = (event) => {
    event.preventDefault()
    // if (newName.length < 2) {
    //   setMessage(`Person validation failed: name:Path\`name\`(${newName}) is shorter than the minimum allowed length(2)`)
    //   setIsSuccess(false)
    //   return
    // }

    // if (number.length < 2) {
    //   setMessage(`Person validation failed: number:Path\`number\`(${number}) is shorter than the minimum allowed length(2)`)
    //   setIsSuccess(false)
    //   return
    // }
    const person = repeaPersonDic(newName)

    if (person !== null) {
      console.log(`person id : ${person.id}`)

      if (window.confirm(`${newName} is already added to phonebook, replace the old number with a new one?`)) {

        person.number = number
        personService
          .update(person)
          .then(returnedPerson => {
            setPersons(persons.map(p => p.id === person.id ? returnedPerson : p))
          })
          .catch(error => {
            ShowMessage(error.response.data.error, false, 5000)
          })

      }
    } else {
      const personObject = {
        name: newName,
        number: number
      }

      personService
        .creat(personObject)
        .then(returnedPerson => {
          setPersons(persons.concat(returnedPerson))
          ShowMessage(`Added ${returnedPerson.name}`, true, 2000)
          setNewName('')
          setNumber('')
        })
        .catch(error => {
          ShowMessage(error.response.data.error, false, 2000)
        })
    }
  }
  const repeaPersonDic = (name) => {
    console.log(name)
    const iterator = persons.values()
    for (const dic of iterator) {
      if (dic['name'] === name)
        return dic
    }
    return null
  }
  const filterPerson = (event) => {
    setFilter(event.target.value)
  }
  return (
    <div>
      <h1>Phonebook</h1>
      <Notification message={message} isSuccess={isSuccess} />
      <Filter filter={filter} filterPerson={filterPerson} />
      <h2>add a new</h2>
      <PersonForm addPerson={addPerson} newName={newName} number={number} handleName={handleName} handleNumber={handleNumber} />
      <h2>Numbers</h2>
      {personToShow.map(person =>
        <Persons key={person.id} person={person} deletePerson={() => deletePerson(person)} />)}
    </div>
  )
}

export default App