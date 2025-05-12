import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';

const CountryDetails = () => {
  const [details, setDetails] = useState(null);
  const { id } = useParams();

  useEffect(() => {
    fetch(`https://restcountries.com/v3.1/alpha/${id}`)
      .then(res => res.json())
      .then(data => {
        if (data && data.length > 0) {
          setDetails(data[0]);
        } else {
          console.error('No data found for id:', id);
        }
      })
      .catch(err => console.error('Failed loading details', err));
  }, [id]);

  if (!details) return <p>Loading...</p>;

  return (
    <>
      <button onClick={() => window.history.back()}>← Back</button>
      <div className='country-details-container'>
        <div>
          <img src={details.flags.png} alt={details.flags.alt} />
        </div>
        <div className='country-info-container'>
          <h2>{details.name.common}</h2>
          <div className='details'>
            <div className='details-column'>
              <p>Native name: {Object.values(details.name.nativeName)[0].common}</p>
              <p>Population: {details.population}</p>
              <p>Region: {details.region}</p>
              <p>Sub Region: {details.subregion}</p>
              <p>Capital: {details.capital}</p>
            </div>
            <div className='details-column'>
              <p>Top level domain: {details.tld}</p>
              <p>Currencies: {Object.values(details.currencies).map(c => c.name).join(", ")}</p>
              <p>Languages: {Object.values(details.languages).join(", ")}
              </p>
            </div>
          </div>
          {details.borders && details.borders.length > 0 && (
            <div>
              <p>Borders:</p>
              <ul>
                {details.borders.map((code, i) => (
                  <li key={i}>{code}</li>
                ))}
              </ul>
            </div>
          )}

        </div>
      </div>
    </>
  );
};

export default CountryDetails;
