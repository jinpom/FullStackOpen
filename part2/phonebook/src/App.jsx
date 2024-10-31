import { useState, useEffect } from 'react';
import personService from './services/persons';
import Filter from './components/Filter';
import PersonForm from './components/PersonForm';
import Persons from './components/Persons';
import Notification from './components/Notification';
import './index.css';

const App = () => {
  const [persons, setPersons] = useState([]);
  const [newName, setNewName] = useState('');
  const [newNumber, setNewNumber] = useState('');
  const [filter, setFilter] = useState('');
  const [notification, setNotification] = useState(null);
  const [notificationType, setNotificationType] = useState(null);

  useEffect(() => {
    personService.getAll().then((initialPersons) => {
      setPersons(initialPersons);
    });
  }, []);

  const handleNameChange = (event) => {
    setNewName(event.target.value);
  };

  const handleNumberChange = (event) => {
    setNewNumber(event.target.value);
  };

  const handleFilterChange = (event) => {
    setFilter(event.target.value);
  };

  const updatePerson = (phonebookMatch) => {
    const changedPerson = {
      name: phonebookMatch.name,
      number: newNumber,
    };
    personService
      .update(phonebookMatch.id, changedPerson)
      .then((returnedPerson) => {
        setPersons(
          persons.map((person) =>
            person.id === returnedPerson.id ? returnedPerson : person
          )
        );
        setNewName('');
        setNewNumber('');
        setNotification(
          `Successfully replaced ${returnedPerson.name}'s number`
        );
        setNotificationType('success');
        setTimeout(() => {
          setNotification(null);
          setNotificationType(null);
        }, 5000);
      });
  };

  const addPerson = (event) => {
    event.preventDefault();
    const phonebookMatch = persons.find(
      (person) =>
        person.name.trim().toLowerCase() === newName.trim().toLowerCase()
    );
    if (phonebookMatch) {
      const confirmUpdate = confirm(
        `${newName} is already added to phonebook, replace the old number with a new one?`
      );
      if (confirmUpdate === true) {
        updatePerson(phonebookMatch);
      } else {
        return;
      }
    } else {
      const newPerson = {
        name: newName,
        number: newNumber,
      };

      personService.create(newPerson).then((returnedPerson) => {
        setPersons(persons.concat(returnedPerson));
        setNewName('');
        setNewNumber('');
        setNotification(`Successfully added ${returnedPerson.name}`);
        setNotificationType('success');
        setTimeout(() => {
          setNotification(null);
          setNotificationType(null);
        }, 5000);
      });
    }
  };

  const deletePerson = (id) => {
    const personToDelete = persons.find((person) => person.id === id);
    const isDeleteConfirmed = confirm(`Delete ${personToDelete.name} ?`);
    if (isDeleteConfirmed === true) {
      personService
        .remove(id)
        .then((deletedPerson) => {
          setPersons(
            persons.filter((person) => person.id !== deletedPerson.id)
          );
        })
        .catch((error) => {
          setNotification(
            `Information of ${personToDelete.name} has already been romoved from server`
          );
          setNotificationType('error');
          setTimeout(() => {
            setNotification(null);
            setNotificationType(null);
          }, 5000);
        });
    } else {
      return;
    }
  };

  const personsToShow = persons.filter((person) =>
    person.name.toLowerCase().includes(filter.toLowerCase())
  );

  return (
    <div>
      <h2>Phonebook</h2>
      <Notification message={notification} messageType={notificationType} />

      <Filter filter={filter} handleFilterChange={handleFilterChange} />

      <h3>Add a new</h3>
      <PersonForm
        addPerson={addPerson}
        newName={newName}
        newNumber={newNumber}
        handleNameChange={handleNameChange}
        handleNumberChange={handleNumberChange}
      />

      <h3>Numbers</h3>
      <Persons personsToShow={personsToShow} deletePerson={deletePerson} />
    </div>
  );
};

export default App;
