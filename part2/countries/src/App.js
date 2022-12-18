import { useState, useEffect } from 'react'
import axios from 'axios'

function CountryList({ showCountries, setCountry, country }) {
  console.log(country)
  if (country == '') {
    return
  }
  if (showCountries.length > 1 && showCountries.length <= 10) {
    console.log(showCountries.length, typeof showCountries.length)
    return (
      <div>
        {showCountries.map(country =>
          <li key={country.name.common}>{country.name.common}
            <button onClick={() => {
              setCountry(country.name.common)
            }}>show</button>
          </li>)}
      </div>
    )
  } else {
    return (
      <div>Too many matches, specify another filter</div>
    )
  }
}
function Detail({ country }) {
  if (country !== null) {
    return (
      <div>
        <h1> {country.name.common}</h1>
        <p>
          capital {country.capital}<br />
          arew {country.area}
        </p>
        <p><b>languages:</b></p>
        <p>{Object.values(country.languages).join('\n')}</p>
        <img src={country.flags.png} alt='s' />

        <h2>Weather in {country.capital[0]}</h2>
        <p>temperature</p>
      </div>
    )
  }

}
function Weather({ lat, lng }) {
  useEffect(() => {
    axios.get('https://api.openweathermap.org/data/2.5/weather?lat=' + lat + '&lon=' + lng + '&appid=b7b8e00f6def44d8ce58c1db934e87d7')
      .then(response => {
        console.log(response)
      })
  }, [])
  return (
    <div></div>
  )
}

function App() {
  const [countries, setCountries] = useState([])
  const [country, setCountry] = useState('')
  const showCountries = country.length > 0 ? countries.filter(city => city.name.common.toLowerCase().includes(country.toLowerCase())) : countries
  const detailCountry = showCountries.length == 1 ? showCountries[0] : null
  const lat = detailCountry == null ? 0 : detailCountry.latlng[0]
  const lng = detailCountry == null ? 0 : detailCountry.latlng[1]
  const handleSearch = (event) => {
    setCountry(event.target.value)
  }
  useEffect(() => {
    axios.get('https://restcountries.com/v3.1/all')
      .then(response => {
        // console.log(response)
        setCountries(response.data)
      })
  }, [])

  return (
    <div>
      <div>
        <p>find countries <input value={country} onChange={handleSearch} /></p>
        <CountryList showCountries={showCountries} setCountry={setCountry} country={country} />
        <Detail country={detailCountry} />
        <Weather lat={lat} lng={lng} />
      </div>
    </div>
  );
}

export default App;
