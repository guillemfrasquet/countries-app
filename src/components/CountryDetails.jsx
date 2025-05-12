import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';

const CountryDetails = () => {
  const [details, setDetails] = useState(null);
  const [borders, setBorders] = useState([]);
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

        const countryData = data[0];
        console.log(countryData.borders.length);
        if(countryData.borders?.length) {

          fetch(`https://restcountries.com/v3.1/alpha?codes=${countryData.borders.join(',')}`)
          .then(res => res.json())
          .then(borderCountries => {
            setBorders(borderCountries);
          });
        }
      })
      .catch(err => console.error('Failed loading details', err));
  }, [id]);

  if (!details) return <p>Loading...</p>;

  return (
    <div className='container'>
      <button onClick={() => window.history.back()} className='back-button'>← Back</button>
      <div className='country-details-container'>
        <div className='country-image-container'>
          <img src={details.flags.svg} alt={details.flags.alt} width={"100%"} />
        </div>
        <div className='country-info-container'>
          <h2>{details.name.common}</h2>
          <div className='details'>
            <div className='details-column'>
              <p><span className='label'>Native name:</span> {Object.values(details.name.nativeName)[0].common}</p>
              <p><span className='label'>Population:</span> {details.population}</p>
              <p><span className='label'>Region:</span> {details.region}</p>
              <p><span className='label'>Sub Region:</span> {details.subregion}</p>
              <p><span className='label'>Capital:</span> {details.capital}</p>
            </div>
            <div className='details-column'>
              <p><span className='label'>Top level domain:</span> {details.tld}</p>
              <p><span className='label'>Currencies:</span> {Object.values(details.currencies).map(c => c.name).join(", ")}</p>
              <p><span className='label'>Languages:</span> {Object.values(details.languages).join(", ")}
              </p>
            </div>
          </div>
          {borders && borders.length > 0 && (
            <div className='border-countries'>
              <span className='label'>Border countries:</span>
              <ul>
              {borders.map((country, i) => (
                <li key={i}>
                  <a href={`./${country.cca3.toLowerCase()}`} className='border-country-tag'>
                    {country.name.common}
                  </a>
                </li>
              ))}
              </ul>
            </div>
          )}

        </div>
      </div>
    </div>
  );
};

export default CountryDetails;
