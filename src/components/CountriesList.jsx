import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';


const CountriesList = () => {
        const [countries, setCountries] = useState([]);
        const [region, setRegion] = useState("");
        const [nameSearch, setNameSearch] = useState("");

        const filterByRegion = (e) => {
            const regionFiltered = e.target.value;
            setRegion(regionFiltered);
        };

        const filterByCountryName = (e) => {
            const nameSearched = e.target.value;
            setNameSearch(nameSearched);
        };

        useEffect(() => {
            let fetchUrl = "";

            if(nameSearch !== "") {
                fetchUrl = "https://restcountries.com/v3.1/name/" + nameSearch;
            } else if(region !== "") {
                fetchUrl = "https://restcountries.com/v3.1/region/" + region;
            } else {
                fetchUrl = "https://restcountries.com/v3.1/all";
            }
            fetch(fetchUrl)
            .then(res => res.json())
            .then( data => {
                // Sort by common name
                let result = data.sort((a, b) =>
                  a.name.common.localeCompare(b.name.common)
                );
                if(nameSearch !== "" && region !== "") {
                    result = result.filter(country =>
                        country.region.includes(region)
                    );
                }
                setCountries(result);
            })

            .catch(err => console.error('Failed loading countries', err));
        }, [region, nameSearch])

    return (
        <div className='container list-container'>
            <div className='filters'>
                <input type="text" placeholder="Search for a country..." onChange={filterByCountryName} className='input-name'></input>
                <select value={region} onChange={filterByRegion} className='select-region'>
                    <option value="">Filter by Region</option>
                    <option value="Africa">Africa</option>
                    <option value="America">America</option>
                    <option value="Asia">Asia</option>
                    <option value="Europe">Europe</option>
                    <option value="Oceania">Oceania</option>
                </select>
            </div>
            

            <div className='countries-grid'>
                {countries.map(country => (
                    <CountryCard
                    key={country.cca3}
                    id={country.cca3}
                    name={country.name.common}
                    flag={country.flags.png}
                    population={country.population}
                    region={country.region}
                    capital={country.capital}
                    />
                ))}
            </div>
            
        </div>      
    ) ;
  };
  
export default CountriesList;
  

function CountryCard({id, name, flag, population, region, capital}) {
    return (
        
            <div className="country-card" id={"card-" + id}>
                <Link to={"country/" + id.toLowerCase()} className="country-wrapper-link">
                    <div className='country-flag'>
                        <img alt="Flag" src={flag}/>
                    </div>
                    
                    <div className="country-summary">
                        <p className='country-name'>{name}</p>
                        <p className='country-population'><span className='label'>Population:</span> {population.toLocaleString('en-EN')}</p>
                        <p className='country-region'><span className='label'>Region:</span> {region}</p>
                        <p className='country-capital'><span className='label'>Capital:</span> {capital}</p>
                    </div>
                </Link>
            </div>
        
    )

}