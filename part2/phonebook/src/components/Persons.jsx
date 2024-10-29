import Person from './Person';

const Persons = ({ personsToShow, deletePerson }) => {
  return (
    <>
      {personsToShow.map((person) => (
        <Person key={person.id} person={person} deletePerson={deletePerson} />
      ))}
    </>
  );
};

export default Persons;
