import { useState } from 'react';
import axios from 'axios';

const Country = ({ country }) => {
  const [temp, setTemp] = useState('');
  const [icon, setIcon] = useState('');
  const [iconAlt, setIconAlt] = useState('');
  const [wind, setWind] = useState('');

  const api_key = import.meta.env.VITE_OW_KEY;
  const lat = country.capitalInfo.latlng[0];
  const lon = country.capitalInfo.latlng[1];

  axios
    .get(
      `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&units=metric&appid=${api_key}`
    )
    .then((response) => {
      const weather = response.data;
      setTemp(weather.main.temp);
      setIcon(weather.weather[0].icon);
      setIconAlt(weather.weather[0].description);
      setWind(weather.wind.speed);
    });

  return (
    <>
      <h1>{country.name.common}</h1>
      <div>capital {country.capital}</div>
      <div>area {country.area}</div>
      <h3>languages:</h3>
      <ul>
        {Object.entries(country.languages).map((language) => (
          <div key={language[0]}>{language[1]}</div>
        ))}
      </ul>
      <img src={country.flags.png} alt={country.flags.alt} />
      <h2>Weather in {country.capital[0]}</h2>
      <div>temperature {temp} Celcius</div>
      <img
        src={`https://openweathermap.org/img/wn/${icon}@2x.png`}
        alt={iconAlt}
      />
      <div>wind {wind} m/s</div>
    </>
  );
};

export default Country;
