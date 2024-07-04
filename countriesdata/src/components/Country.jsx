const Country = ({ country }) => {
    return (
        <div>
            <h1>{country.name.common}</h1>
            <div>Capital: {country.capital[0]}</div>
            <div>Area: {country.area} km2</div>
            <h2>Languages:</h2>
            <ul>
                {Object.values(country.languages).map((language) => (
                    <li key={language}>{language}</li>
                ))}
            </ul>
            <img src={country.flags.png} alt={country.flags.alt} width="100" />
        </div>
    )
}

export default Country