const Countries = ({ countries, handleShow }) => {
    return (
        <div>
            {countries.length > 10
                ? <p>Too many matches, specify another filter</p>
                : <ul>
                    {countries.map((country) => (
                        <li key={country.name.common}>
                            {country.name.common}
                            <button onClick={() => handleShow(country)}>show</button>
                        </li>
                    ))}
                </ul>
            }
        </div>
    )
}

export default Countries