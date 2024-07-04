import { useEffect, useState } from 'react'

import Countries from './components/Countries'
import Country from './components/Country'
import Weather from './components/Weather'

import countriesService from './services/countriesServices'
import weatherService from './services/weatherService'

const App = () => {
  const [search, setSearch] = useState('')
  const [countries, setCountries] = useState([])
  const [filteredCountries, setFilteredCountries] = useState([])
  const [weather, setWeather] = useState(null)
  const [country, setCountry] = useState(null)

  // Fetch countries data from the server on initial render
  useEffect(() => {
    countriesService
      .getAll()
      .then((initialCountries) => {
        setCountries(initialCountries)
      })
      .catch((error) => {
        console.log(`Failed to load countries, error: ${error}`)
      })
  }, [])

  // Filter countries based on search input
  // get country and weather data if only one country is found
  // useEffect runs when search changes
  useEffect(() => {
    if (search === '') {
      return
    }

    const newFilteredCountries = countries.filter((country) =>
      country.name.common.toLowerCase().includes(search)
    )

    if (newFilteredCountries.length === 1) {
      setCountry(newFilteredCountries[0])

      const [lat, long] = newFilteredCountries[0].capitalInfo.latlng
      getWeather(lat, long)
    } else {
      setFilteredCountries(newFilteredCountries)
      setCountry(null)
    }
  }, [search])

  // Fetch weather data from the server
  const getWeather = (lat, long) => {
    weatherService
      .getWeather(lat, long)
      .then((returnedWeather) => {
        setWeather(returnedWeather)
      })
      .catch((error) => {
        console.log(`Failed to load weather, error: ${error}`)
      })
  }

  // Button click event handler to show country and weather
  const showCountry = (country) => {
    setCountry(country)
    const [lat, long] = country.capitalInfo.latlng
    getWeather(lat, long)
  }

  return (
    <div>
      find countries <input value={search} onChange={e => setSearch(e.target.value.toLowerCase())} />
      {country && weather
        ? (<>
          <Country country={country} />
          <Weather weather={weather} />
        </>)
        : <Countries countries={filteredCountries} handleShow={showCountry} />}
    </div>
  )
}

export default App
