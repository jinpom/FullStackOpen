import { Fragment } from 'react';
import { useState } from 'react';
import Country from './Country';
import '../index.css';

const Countries = ({ countries }) => {
  const [clickTracker, setClickTracker] = useState(
    Array(countries.length).fill(false)
  );

  const handleShowClick = (index) => {
    const newTracker = [...clickTracker];
    newTracker[index] = !clickTracker[index];
    setClickTracker(newTracker);
    console.log(clickTracker);
  };

  if (countries.length > 10) {
    return <div>Too many matches, specifiy another filter</div>;
  }
  if (countries.length > 1 && countries.length <= 10) {
    return (
      <ul>
        {countries.map((country, i) => (
          <Fragment key={country.name.common}>
            <div>
              {country.name.common}
              <button
                onClick={() => {
                  handleShowClick(i);
                }}
              >
                show
              </button>
            </div>
            {clickTracker[i] && <Country country={country} />}
          </Fragment>
        ))}
      </ul>
    );
  }
  if (countries.length === 1) {
    return <Country country={countries[0]} />;
  }
};

export default Countries;
