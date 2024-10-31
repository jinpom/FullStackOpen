import { useState, useEffect } from 'react';
import axios from 'axios';
import Countries from './components/Countries';

function App() {
  const baseUrl = `https://studies.cs.helsinki.fi/restcountries/api`;

  const [query, setQuery] = useState('');
  const [allCountries, setAllCountries] = useState([]);
  const [filteredCountries, setFilteredCountries] = useState([]);

  useEffect(() => {
    axios
      .get(`${baseUrl}/all`)
      .then((response) => {
        setAllCountries(response.data);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  const handleQueryChange = (event) => {
    const currentQuery = event.target.value;
    setQuery(currentQuery);
    const results = allCountries.filter((country) =>
      country.name.common.toLowerCase().includes(currentQuery.toLowerCase())
    );
    setFilteredCountries(results);
  };

  return (
    <>
      <div>
        find countries <input value={query} onChange={handleQueryChange} />
      </div>
      <Countries countries={filteredCountries} />
    </>
  );
}

export default App;
