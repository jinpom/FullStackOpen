import Person from './Person';

const Persons = ({ personsToShow }) => {
  return (
    <>
      {personsToShow.map((person) => (
        <Person key={person.id} person={person} />
      ))}
    </>
  );
};

export default Persons;
